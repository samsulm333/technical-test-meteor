const Sequelize = require("sequelize");

const db = {};

const sequelize = Sequelize("test_meteor", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
  freezeTableName: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
