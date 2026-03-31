#!/bin/bash
# ═══════════════════════════════════════════════════════════
# EU FUNDING SCHOOL — Auto-sync con GitHub
# Equivalente al hook Stop del Claude del VPS
# ═══════════════════════════════════════════════════════════
#
# USO:
#   ./sync.sh              # Sync completo (pull + commit + push)
#   ./sync.sh --check      # Solo muestra que cambiaria
#
# Este script sincroniza la carpeta local con el repo
# erasmus-lab-html en GitHub.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_NAME="erasmus-lab-html"
REPO_URL_BASE="github.com/ongpasos-droid/${REPO_NAME}.git"
CLONE_DIR="/tmp/efs-sync-${REPO_NAME}"
TOKEN_FILE="$SCRIPT_DIR/.git-token"
LOG_PREFIX="[SYNC $(date '+%Y-%m-%d %H:%M:%S')]"
CHECK_ONLY=false

# Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
    --check) CHECK_ONLY=true; shift ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

log() { echo "$LOG_PREFIX $1"; }
error() { echo "$LOG_PREFIX ERROR: $1" >&2; }

# Leer token
if [ ! -f "$TOKEN_FILE" ]; then
  error "No se encontro $TOKEN_FILE"
  error "Crea el archivo con: echo 'ghp_TUTOKEN' > $TOKEN_FILE"
  exit 1
fi
TOKEN=$(cat "$TOKEN_FILE" | tr -d '[:space:]')

REPO_URL="https://ongpasos-droid:${TOKEN}@${REPO_URL_BASE}"

log "=== EU Funding School Sync — Inicio ==="
log "Workspace: $WORKSPACE_DIR"

# Clonar o actualizar repo
if [ -d "$CLONE_DIR/.git" ]; then
  log "Repo ya clonado, haciendo pull..."
  cd "$CLONE_DIR"
  git pull origin main 2>/dev/null || log "Pull fallido, continuando..."
else
  log "Clonando repo..."
  rm -rf "$CLONE_DIR"
  git clone "$REPO_URL" "$CLONE_DIR" 2>&1 | grep -v token || true
fi

cd "$CLONE_DIR"
git config user.email "permaculturacantabria@gmail.com"
git config user.name "ongpasos-droid"

# Copiar archivos del workspace al repo
log "Copiando archivos..."

# Modules — solo archivos .html reales
mkdir -p "$CLONE_DIR/modules"
find "$WORKSPACE_DIR" -maxdepth 1 -name "*.html" -type f | while read f; do
  cp "$f" "$CLONE_DIR/modules/" && log "  modules/$(basename "$f")"
done

# Bot
mkdir -p "$CLONE_DIR/bot"
for f in tasks.json run-bot.sh SETUP.md sync.sh; do
  [ -f "$WORKSPACE_DIR/bot/$f" ] && cp "$WORKSPACE_DIR/bot/$f" "$CLONE_DIR/bot/" && log "  bot/$f"
done

# Data (si hay cambios)
if [ -d "$WORKSPACE_DIR/data" ]; then
  mkdir -p "$CLONE_DIR/data"
  cp -r "$WORKSPACE_DIR/data/"* "$CLONE_DIR/data/" 2>/dev/null && log "  data/*" || true
fi

# Ver que cambio
CHANGES=$(git status --short)
if [ -z "$CHANGES" ]; then
  log "Sin cambios. Nada que sincronizar."
  log "=== Sync — Fin ==="
  exit 0
fi

log "Cambios detectados:"
echo "$CHANGES" | while read line; do log "  $line"; done

if $CHECK_ONLY; then
  log "[CHECK] Modo check — no se hace commit ni push"
  log "=== Sync — Fin ==="
  exit 0
fi

# Commit y push
git add -A
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
FILE_COUNT=$(echo "$CHANGES" | wc -l | tr -d ' ')
git commit -m "sync: auto-sync from Cowork ($TIMESTAMP)

$FILE_COUNT files changed
Automated by EU Funding School sync"

git push origin main 2>&1 | grep -v token || true

log "Push completado OK"
log "=== EU Funding School Sync — Fin ==="
