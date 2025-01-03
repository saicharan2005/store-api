require('dotenv').config();

const connectDB = require('./db/connect.js');

const Product = require('./models/product.js');

const jsonProduct =require('./products.json');



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany();
    await Product.create(jsonProduct);
    console.log("success!!!!!!!!");
    process.exit(0);
    
  } catch (error) {
    
    console.log(error);
    process.exit(1)
  }
  
}

start();
