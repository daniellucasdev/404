import { up } from 'infra/migrations/1751723788491_first-migration-test'
import migrationRunner from 'node-pg-migrate'
import { join } from "node:path"

export default async function migrations(request, response) {
   const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations"
   })
    response.status(200).json(migrations)
}
