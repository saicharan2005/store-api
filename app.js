const connectDB =require('./db/connect.js')
require('dotenv').config() 
const router = require('./routes/products.js');



const express = require('express');
const app =express();


const notFoundError = require('./middleware/not-found');

const errorHandlerMiddleware =require('./middleware/error-handler');



//middleware
app.use(express.json())


// routes
app.get('/',(req,res)=>{
  res.send(`<h1> store api</h1><a href="/api/v1/products"> product</a>` )
})


app.use('/api/v1/products',router)


//product routes
app.use(notFoundError)
app.use(errorHandlerMiddleware)


//dynamic port

const port = process.env.port || 5000;

const start =async() =>{
  try {
    //connrctdb
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`port is listening on port ${port}`));
    
  } catch (error) {
    console.log(err);
    
    
  }

}


start();