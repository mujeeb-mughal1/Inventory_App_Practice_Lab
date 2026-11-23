require("dotenv/config");

const {Client} = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS categories(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT
    );

    CREATE TABLE IF NOT EXISTS items(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(50) NOT NULL,
        description TEXT,
        price NUMERIC(6, 2) NOT NULL ,
        quantity INTEGER NOT NULL DEFAULT 0,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
    );
`;

async function main() {
    const connectionString = process.env.DATABASE_URL
    
    if(!process.env.DATABASE_URL){
        console.error("Missing database URL argument");
        process.exit(1);
   }
    
    console.log("seeding...");
    const client = new Client({connectionString});
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();