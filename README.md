# Prueba API (Express + SQLite)

API REST construida con Express.js siguiendo una arquitectura por capas:

- `routes -> requests -> controllers -> services -> models -> resources`

La respuesta de la API sigue convención **JSON:API** para resultados y errores.

## Requisitos

- Node.js 18+ (recomendado)
- npm

## Instalacion

```bash
npm install
```

## Variables de entorno

Crea/edita el archivo `.env` en la raiz del proyecto:

```env
PORT=3000
DB_FILE=app.sqlite

# Seguridad
# CORS_ORIGIN=*
# RATE_LIMIT_WINDOW_MS=900000
# RATE_LIMIT_MAX=200
```

## Inicializar base de datos

Este proyecto usa SQLite y migraciones con Knex.

1) Crear estructura de tablas:

```bash
npm run migrate
```

2) Insertar datos semilla:

```bash
npm run seed
```

Si necesitas revertir la ultima migracion:

```bash
npm run migrate:rollback
```

## Ejecutar proyecto

```bash
npm start
```

Servidor por defecto:

- `http://localhost:3000` (o el puerto definido en `PORT`)

## Comandos disponibles

- `npm start`  
  Inicia la API.

- `npm run dev`  
  Inicia la API (actualmente equivalente a `start`).

- `npm run routes`  
  Lista rutas registradas en Express.

- `npm run db:prepare`  
  Prepara carpeta de base de datos.

- `npm run migrate`  
  Ejecuta migraciones.

- `npm run migrate:rollback`  
  Revierte la ultima migracion.

- `npm run seed`  
  Ejecuta seeds.

- `npm run lint`  
  Ejecuta ESLint.

- `npm run format`  
  Formatea con Prettier.

- `npm test`  
  Ejecuta tests con Jest.

- `npm run test:watch`  
  Ejecuta tests en modo watch.

## Endpoints principales

### Salud de la API

- `GET /api/v1/health`

### Usuarios

- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `POST /api/v1/users`
- `DELETE /api/v1/users/:id`

Ejemplo `POST /api/v1/users`:

```json
{
  "name": "Grace Hopper",
  "email": "grace@example.com"
}
```

## Formato de respuesta (JSON:API)

Respuesta exitosa (coleccion):

```json
{
  "jsonapi": { "version": "1.0" },
  "data": [
    {
      "type": "users",
      "id": "1",
      "attributes": {
        "name": "Ada Lovelace",
        "email": "ada@example.com",
        "createdAt": "2026-01-01T00:00:00.000Z"
      }
    }
  ]
}
```

Respuesta de error:

```json
{
  "jsonapi": { "version": "1.0" },
  "errors": [
    {
      "status": "404",
      "title": "Not Found",
      "detail": "Route /api/v1/unknown does not exist"
    }
  ]
}
```

## Estructura del proyecto

```txt
app/
  config/
  controllers/
  middlewares/
  models/
  requests/
  resources/
  routes/
  services/
  traits/
bin/
database/
  migrations/
  seeds/
scripts/
tests/
```

## Calidad y pruebas

- Lint:

```bash
npm run lint
```

- Formato:

```bash
npm run format
```

- Pruebas:

```bash
npm test
```

## Notas importantes

- El archivo de base de datos SQLite (`*.sqlite`) esta ignorado en git.
- Si aparece `Port 3000 is already in use`, libera el puerto o cambia `PORT` en `.env`.
- Si aparece error de tabla faltante (`users`), corre:

```bash
npm run migrate
npm run seed
```
