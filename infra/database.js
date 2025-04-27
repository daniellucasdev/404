import {Client} from 'pg';
async function query(queryObject) {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        database: 'postgres',
        password: 'password'
    });
    await client.connect();
    const result = await client.query(queryObject)
    client.end;
    return result;
}

export default {
    query: query,
};