const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR ( 255 ) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR ( 255 ) NOT NULL,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL,
        unit VARCHAR(50) NOT NULL
    );
`;

async function main() {
  console.log("Creating tables...");
  const client = new Client({
    connectionString:
      "postgresql://tiffanyluu:stinky@localhost:5432/barber_supply",
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    await client.end();
  }
}

main();
