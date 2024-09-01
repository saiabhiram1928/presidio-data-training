const express = require('express');
const mongoose  = require('mongoose')
const product  =  require('./schema/product')
const cors = require('cors')

const app = express();
const port = 5001;

const mongo_uri = "mongodb+srv://benny:ZLeywBCdV1aybO9s@cluster0.6vovitk.mongodb.net/Ecommerce";
mongoose.connect(mongo_uri, {
  useNewurlParser: true,
});

mongoose.connection
  .once("open", () => {
    console.log("db connected");
  })
  .on("error", (err) => {
    console.error(err);
  });

  app.use(cors())

app.get('/', async (req, res) => {
    try {
        const result = await product.find();
        res.json(result);
    } catch (err) {
        res.status(500).send('Error fetching data: ' + err.message);
    }
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});