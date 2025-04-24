const { Pool } = require("pg");

module.exports = new Pool({
  connectionString:
    "postgresql:/tiffanyluu:stinky@localhost:5432/barber_supply",
});
