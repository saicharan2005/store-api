const product = require("../models/product")


const getAllproductsStatic = async (req,res)=>{

  const products = await product.find({
    // featured:true
    name:"wooden table"
  })

  return res.status(200).json({products,noProducts:products.length})

}


const getAllproducts = async (req,res)=>{

  console.log(req.query); 

  

  // const products = await product.find(req.query)


  const {featured,company,name} = req.query

  queryQbject={}
  if(featured){
    queryQbject.featured = featured ==='true'?true:false;
  }
  if(company){
    queryQbject.company =company;
  }

  if(name){
    queryQbject.name ={$regex:name ,$options:"i"}
  }
  const products = await product.find(queryQbject)


  return res.status(200).json({products,noProducts:products.length})

}


module.exports= {getAllproductsStatic,getAllproducts}