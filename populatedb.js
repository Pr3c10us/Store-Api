const products = require("./models/product");
const connectDB = require("./db/connect");
const jsonProducts = require("./products.json");
require("dotenv").config();
(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await products.deleteMany();
    await products.create(jsonProducts);
    console.log("It's Done");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
