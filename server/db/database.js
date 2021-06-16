const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const dbName = process.env.NODE_ENV === "test" ? `${pkg.name}_test` : pkg.name;
console.log(`Opening database connection to ${dbName}`);

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
