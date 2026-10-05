const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const databasePath =
    process.env.DATABASE_PATH ||
    path.join(__dirname, "../../database/crypto_pulse.db");

const databaseDirectory = path.dirname(databasePath);

if (!fs.existsSync(databaseDirectory)) {
    fs.mkdirSync(databaseDirectory, { recursive: true });
}

const db = new Database(databasePath);

db.pragma("foreign_keys = ON");

console.log(`SQLite database connected: ${databasePath}`);

module.exports = db;