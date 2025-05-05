import database from "infra/database.js"

console.log(database)

async function status(request, response) {

    const updatedAt = new Date().toISOString();

    const databaseVersionResult = await database.query("SHOW server_version;");
    const databaseVersionValue = databaseVersionResult.rows[0].server_version;

    const databaseMaxConnectionsResult = await database.query("SHOW max_connections;")
    const databaseMaxConnectionsValue = await databaseMaxConnectionsResult.rows[0].max_connections

    const databaseOpenedConnectionsResult = await database.query("SELECT * pg_stat_activity;")
    console.log(databaseOpenedConnectionsResult)

    response.status(200).json({
        updated_at: updatedAt,
        dependencies: {
            database: {
                version: databaseVersionValue,
                max_connections: parseInt(databaseMaxConnectionsValue),
            }
        },
    })
}

export default status;