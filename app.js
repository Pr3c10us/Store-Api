const express = require('express');
const app = express();

require('dotenv').config();

const router = require('./routes/products');

const connectDB = require('./db/connect');

app.use(express.json());

app.use(express.json());

app.use('/api/v1/products', router);

(async () => {
  const port = process.env.PORT || 5000;
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Test Api on localhost at port:${port} `);
  });
})();
