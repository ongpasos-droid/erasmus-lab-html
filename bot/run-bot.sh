#!/bin/bash
# ═══════════════════════════════════════════════════════════
# EU FUNDING SCHOOL — Bot nocturno con Claude Code
# Orquestador de tareas automáticas
# ═══════════════════════════════════════════════════════════
#
# USO:
#   ./run-bot.sh                  # Ejecuta todas las tareas pending
#   ./run-bot.sh --task task-003  # Ejecuta solo una tarea específica
#   ./run-bot.sh --dry-run        # Muestra qué haría sin ejecutar
#
# CRON (ejemplo: cada noche a las 23:00):
#   0 23 * * * /home/claudebot/erasmus-lab-html/bot/run-bot.sh >> /home/claudebot/logs/bot-$(date +\%Y\%m\%d).log 2>&1

set -euo pipefail

# ─── CONFIG ───
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TASKS_FILE="$SCRIPT_DIR/tasks.json"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_PREFIX="[BOT $(date '+%H:%M:%S')]"
MAX_TASKS=5
PAUSE_SECONDS=30
DRY_RUN=false
SINGLE_TASK=""

# ─── PARSE ARGS ───
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=true; shift ;;
    --task) SINGLE_TASK="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

# ─── HELPERS ───
log() { echo "$LOG_PREFIX $1"; }
error() { echo "$LOG_PREFIX ERROR: $1" >&2; }

check_credits() {
  # Intenta un comando simple para verificar que Claude responde
  local result
  result=$(claude -p "Responde solo: OK" --max-turns 1 2>&1) || true
  if echo "$result" | grep -qi "rate.limit\|quota\|exceeded\|error"; then
    return 1
  fi
  return 0
}

# ─── PREFLIGHT ───
log "═══ EU Funding School Bot — Inicio ═══"
log "Repo: $REPO_DIR"
log "Tasks: $TASKS_FILE"

if ! command -v claude &>/dev/null; then
  error "Claude Code CLI no encontrado. Instala con: npm install -g @anthropic-ai/claude-code"
  exit 1
fi

if ! command -v jq &>/dev/null; then
  error "jq no encontrado. Instala con: apt install jq"
  exit 1
fi

if [ ! -f "$TASKS_FILE" ]; then
  error "No se encontró $TASKS_FILE"
  exit 1
fi

cd "$REPO_DIR"

# Asegurar que estamos en main y actualizados
log "Sincronizando con origin/main..."
git checkout main 2>/dev/null || git checkout -b main
git pull origin main 2>/dev/null || log "No se pudo pull (repo local?)"

# ─── LEER TAREAS ───
if [ -n "$SINGLE_TASK" ]; then
  PENDING=$(jq -r --arg id "$SINGLE_TASK" '.tasks[] | select(.id == $id) | .id' "$TASKS_FILE")
else
  PENDING=$(jq -r '.tasks[] | select(.status == "pending") | .id' "$TASKS_FILE" | head -n "$MAX_TASKS")
fi

TASK_COUNT=$(echo "$PENDING" | grep -c . || true)

if [ "$TASK_COUNT" -eq 0 ]; then
  log "No hay tareas pendientes. Fin."
  exit 0
fi

log "Tareas a ejecutar: $TASK_COUNT"

# ─── EJECUTAR TAREAS ───
COMPLETED=0
FAILED=0

for TASK_ID in $PENDING; do
  TITLE=$(jq -r --arg id "$TASK_ID" '.tasks[] | select(.id == $id) | .title' "$TASKS_FILE")
  BRANCH=$(jq -r --arg id "$TASK_ID" '.tasks[] | select(.id == $id) | .branch' "$TASKS_FILE")
  PROMPT=$(jq -r --arg id "$TASK_ID" '.tasks[] | select(.id == $id) | .prompt' "$TASKS_FILE")
  FILES=$(jq -r --arg id "$TASK_ID" '.tasks[] | select(.id == $id) | .files[]' "$TASKS_FILE" 2>/dev/null || echo "")

  log "──────────────────────────────────────"
  log "Tarea: $TASK_ID — $TITLE"
  log "Rama: $BRANCH"
  TASK_START=$(date '+%H:%M:%S')

  if $DRY_RUN; then
    log "[DRY RUN] Saltando ejecución"
    continue
  fi

  # Verificar créditos antes de cada tarea
  if ! check_credits; then
    log "Créditos agotados o rate limit. Parando."
    break
  fi

  # Crear rama
  git checkout main
  git branch -D "$BRANCH" 2>/dev/null || true
  git checkout -b "$BRANCH"

  # Ejecutar Claude Code
  log "Ejecutando Claude Code..."
  CLAUDE_OUTPUT=$(claude -p "$PROMPT" \
    --allowedTools "Edit,Write,Read,Bash,Glob,Grep" \
    --max-turns 30 \
    2>&1) || {
      error "Claude falló en $TASK_ID"
      # Marcar como failed
      jq --arg id "$TASK_ID" '(.tasks[] | select(.id == $id) | .status) = "failed"' \
        "$TASKS_FILE" > "${TASKS_FILE}.tmp" && mv "${TASKS_FILE}.tmp" "$TASKS_FILE"
      git checkout main
      FAILED=$((FAILED + 1))
      continue
    }

  # Guardar output del bot
  mkdir -p "$REPO_DIR/bot/logs"
  echo "$CLAUDE_OUTPUT" > "$REPO_DIR/bot/logs/${TASK_ID}-$(date +%Y%m%d-%H%M).txt"

  # Commit y push
  git add -A
  if git diff --cached --quiet; then
    log "Sin cambios. Saltando commit."
    git checkout main
    continue
  fi

  git commit -m "bot: $TITLE

Task: $TASK_ID
Branch: $BRANCH
Automated by EU Funding School Bot"

  git push origin "$BRANCH" --force 2>/dev/null || {
    error "No se pudo hacer push de $BRANCH"
    git checkout main
    continue
  }

  # Crear PR si gh está disponible
  if command -v gh &>/dev/null; then
    gh pr create \
      --title "🤖 Bot: $TITLE" \
      --body "## Tarea automática: $TASK_ID

$TITLE

Ejecutada por el bot nocturno de EU Funding School.

**Prompt usado:**
\`\`\`
$(echo "$PROMPT" | head -5)...
\`\`\`

---
_Revisión manual requerida antes de merge._" \
      --base main \
      --head "$BRANCH" 2>/dev/null || log "PR ya existente o gh no configurado"
  fi

  # Marcar como completada
  jq --arg id "$TASK_ID" '(.tasks[] | select(.id == $id) | .status) = "completed"' \
    "$TASKS_FILE" > "${TASKS_FILE}.tmp" && mv "${TASKS_FILE}.tmp" "$TASKS_FILE"

  # Commit del estado actualizado en main
  git checkout main
  git add bot/tasks.json
  git commit -m "bot: mark $TASK_ID as completed" 2>/dev/null || true
  git push origin main 2>/dev/null || true

  COMPLETED=$((COMPLETED + 1))
  log "✅ $TASK_ID completada — inicio: $TASK_START fin: $(date '+%H:%M:%S')"

  # Pausa entre tareas
  if [ "$PAUSE_SECONDS" -gt 0 ]; then
    log "Pausa de ${PAUSE_SECONDS}s..."
    sleep "$PAUSE_SECONDS"
  fi
done

# ─── RESUMEN ───
log "══════════════════════════════════"
log "RESUMEN: $COMPLETED completadas, $FAILED fallidas"
log "═══ EU Funding School Bot — Fin ═══"
