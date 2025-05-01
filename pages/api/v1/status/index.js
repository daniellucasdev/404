import database from "infra/database.js"

console.log(database)

async function status(request, response) {

    const updatedAt = new Date().toISOString();

    const postgresVersionRaw = await database.query("SELECT version();");
    const postgresVersionString = postgresVersionRaw.rows[0].version;

    const connectionsList = await database.query("SHOW max_connections");
    const connectionObj = connectionsList.rows[0];

    const usedConnections = await database.query(
        "SELECT count(*) FROM pg_stat_activity",
      );

  const usedConnectionsCount = usedConnections.rows[0].count;

    response.status(200).json({
        updated_at: updatedAt,
        postgres_version: postgresVersionString,
        max_connections: connectionObj.max_connections,
        used_connections: usedConnectionsCount,
    })
}

export default status;