# erasmus-lab-html

Laboratorio de herramientas HTML para gestión de proyectos Erasmus+.
Maqueta funcional del ecosistema modular — prototipo previo al SaaS.

## Módulos

| Módulo | Archivo | Estado |
|--------|---------|--------|
| M0 · Intake | modules/intake.html | ✅ Activo |
| M1 · Calculator | modules/wizard.html | ✅ Activo |
| M2 · Planner | modules/planner.html | 📋 Pendiente |
| M3 · Developer | modules/developer.html | 📋 Pendiente |
| M4 · Evaluator | modules/evaluator.html | 📋 Pendiente |

## Shared data

| Archivo | Descripción |
|---------|-------------|
| shared/countries.js | 198 países con grupo de coste Erasmus+ y clasificación por renta (Banco Mundial) |

## Data / Schema

| Archivo | Descripción |
|---------|-------------|
| data/erasmus-budget-schema.sql | CREATE TABLE PostgreSQL/Supabase — 17 tablas |
| data/erasmus-budget-schema.json | JSON Schema completo con relaciones |
| data/focus-sample-project.json | Proyecto FOCUS de ejemplo para testing |

## Flujo de datos entre módulos

```
intake.html
    ↓ exporta {nombre}-wizard-ready.json
wizard.html
    ↓ exporta {nombre}-erasmus.json
planner.html  (próximamente)
    ↓ exporta {nombre}-planned.json
developer.html  (próximamente)
```

## Stack

- HTML + CSS + JavaScript vanilla
- Sin frameworks ni dependencias externas
- Datos compartidos vía `shared/*.js`
- Compatible con GitHub Pages

## Uso local

Descarga todos los archivos manteniendo la estructura de carpetas.
Abre los HTML desde un servidor local (o directamente en el navegador
para la mayoría de funciones).
