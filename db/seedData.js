const { Client } = require("pg");

const SQL = `
  INSERT INTO categories (name) VALUES
    ('Hair Products'),
    ('Shaving Supplies'),
    ('Sanitation'),
    ('Tools'),
    ('Accessories'),
    ('Laundry & Misc')
  ON CONFLICT (name) DO NOTHING;

  INSERT INTO items (name, category_id, quantity, unit) VALUES
    ('Pomade', 1, 10, 'jar'),
    ('Hair Gel', 1, 8, 'jar'),
    ('Hair Spray', 1, 6, 'can'),
    ('Conditioner', 1, 12, 'bottle'),
    ('Shampoo', 1, 15, 'bottle'),
    ('Razor Blades', 2, 50, 'pack'),
    ('Shaving Cream', 2, 5, 'can'),
    ('Aftershave', 2, 4, 'bottle'),
    ('Barbicide', 3, 2, 'bottle'),
    ('Disinfectant Spray', 3, 3, 'can'),
    ('Alcohol Spray Bottles', 3, 5, 'bottle'),
    ('Disposable Gloves (Box of 100)', 3, 3, 'box'),
    ('Hand Sanitizer', 3, 4, 'bottle'),
    ('Hair Clippers', 4, 2, 'unit'),
    ('Clipper Blades', 4, 6, 'set'),
    ('Trimmers', 4, 2, 'unit'),
    ('Trimmer Blades', 4, 5, 'set'),
    ('Foil and Cutter', 4, 3, 'set'),
    ('Styling Capes', 5, 6, 'unit'),
    ('Combs & Brushes Set', 5, 10, 'set'),
    ('Neck Dusters', 5, 4, 'unit'),
    ('Towels', 6, 10, 'unit'),
    ('Neck Strips', 6, 6, 'roll'),
    ('Aprons', 6, 3, 'unit'),
    ('Trash Bags', 6, 20, 'bag'),
    ('Paper Cups', 6, 50, 'cup')
  ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("Seeding data...");
  const client = new Client({
    connectionString:
      "postgresql://tiffanyluu:stinky@localhost:5432/barber_supply",
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Data seeded successfully.");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await client.end();
  }
}

main();
