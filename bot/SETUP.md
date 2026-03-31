# EU Funding School — Bot nocturno

## Setup en el VPS

### 1. Estructura esperada en el VPS

```
/home/claudebot/oscar-assistant/
├── pif-wizard.html
├── intake-wizard.html       (lo creará el bot)
├── ecosystem-hub.html       (lo creará el bot)
├── bot/
│   ├── run-bot.sh           ← orquestador
│   ├── tasks.json           ← tareas pendientes
│   ├── SETUP.md             ← este archivo
│   └── logs/                ← output de cada tarea
└── .git/
```

### 2. Requisitos en el VPS

```bash
# Claude Code CLI
npm install -g @anthropic-ai/claude-code

# jq (para leer tasks.json)
sudo apt install -y jq

# gh CLI (opcional, para crear PRs)
# https://cli.github.com/

# Git configurado
git config --global user.name "Oscar Bot"
git config --global user.email "permaculturacantabria@gmail.com"
```

### 3. Inicializar repo (si no existe)

```bash
cd /home/claudebot/oscar-assistant
git init
git remote add origin git@github.com:ongpasos-droid/oscar-assistant.git
# o usa HTTPS: https://github.com/ongpasos-droid/oscar-assistant.git
git add -A
git commit -m "init: ecosistema EU Funding School"
git push -u origin main
```

### 4. Copiar archivos del bot

Copia `bot/run-bot.sh`, `bot/tasks.json` y `pif-wizard.html` al repo.

```bash
chmod +x bot/run-bot.sh
```

### 5. Test manual

```bash
# Prueba sin ejecutar (dry run)
./bot/run-bot.sh --dry-run

# Ejecutar una sola tarea
./bot/run-bot.sh --task task-001

# Ejecutar todas las pendientes
./bot/run-bot.sh
```

### 6. Activar cron

```bash
crontab -e
```

Añadir:

```
# Bot nocturno EU Funding School — cada noche a las 23:00
0 23 * * * /home/claudebot/oscar-assistant/bot/run-bot.sh >> /home/claudebot/logs/bot-$(date +\%Y\%m\%d).log 2>&1
```

### 7. Revisar por la mañana

```bash
# Ver PRs abiertos por el bot
gh pr list --author @me

# Ver logs de la noche
cat /home/claudebot/logs/bot-$(date +%Y%m%d).log

# Si algo no te gusta, cierra el PR
gh pr close <número>

# Si te gusta, mergea
gh pr merge <número>
```

## Gestionar tareas

Edita `bot/tasks.json` para añadir nuevas tareas o cambiar prioridades.

Cada tarea necesita:
- `id`: identificador único (task-XXX)
- `priority`: número (menor = se ejecuta antes)
- `status`: "pending" | "completed" | "failed"
- `branch`: nombre de la rama git
- `title`: descripción corta
- `prompt`: instrucciones detalladas para Claude
- `files`: archivos que tocará
- `estimated_minutes`: estimación de tiempo

El bot solo ejecuta tareas con status "pending" y las marca como "completed" o "failed" al terminar.
