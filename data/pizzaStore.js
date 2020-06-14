const Sequelize = require("sequelize");

const database = "pizza_luvrs";
const host = "pizza-db.chm9tqdlyxjs.us-east-1.rds.amazonaws.com";
const username = "postgres";
const password = "dontforgetthedb";

// Connect to the db
const pgClient = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
});

// Create a sequelize object that allows us to create
// and get pizza objects from the db
const Pizza = pgClient.define("pizza", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  toppings: {
    type: Sequelize.STRING,
  },
  img: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  created: {
    type: Sequelize.BIGINT,
  },
});

Pizza.sync().then(() => {
  console.log("postgres connection ready");
});

module.exports = Pizza; // export Pizza object
