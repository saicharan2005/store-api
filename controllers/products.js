

const getAllproductsStatic = async (req,res)=>{

  return res.status(200).json({msg:`products testing route`})

}


const getAllproducts = async (req,res)=>{

  return res.status(200).json({msg:`products  route`})

}


module.exports= {getAllproductsStatic,getAllproducts}