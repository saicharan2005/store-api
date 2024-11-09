const product = require("../models/product")


const getAllproductsStatic = async (req,res)=>{

  const products = await product.find({
    featured:true
    // name:"wooden table"
  }).sort('name').select('name price').limit(3).skip(1)

  return res.status(200).json({products,noProducts:products.length})

}


const getAllproducts = async (req,res)=>{

  console.log(req.query); 

  

  // const products = await product.find(req.query)


  const {featured,company,name,sort,field,numericFilter} = req.query

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
  if(numericFilter){
    const operatorMap ={
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilter.replace(regEx,(match)=> `-${operatorMap[match]}-`)
    const options =['price','rating'];
    filters =filters.split(',').forEach((item)=>{
      const [field ,operator,value] =item.split('-')
      if(options.includes(field)){
        queryQbject[field]={[operator]:Number(value)}
      }
    })
  }

  let result= product.find(queryQbject);






  if(sort){
    const sortList =sort.split(',').join(' ');
    result = result.sort(sortList);
  }else{
    result = result.sort('createdAt');
  }


  if(field){
    const fieldList = field.split(',').join(' ');
    result =result.select(fieldList)
  }
  
  const page =Number(req.query.page) || 1;
  const limit =Number(req.query.limit) || 10;

  const skip= (page-1)*limit;

  result=result.skip(skip).limit(limit)


  
  const products = await result;


  return res.status(200).json({products,noProducts:products.length})

}


module.exports= {getAllproductsStatic,getAllproducts}