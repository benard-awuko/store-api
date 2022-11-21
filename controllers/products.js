let Product = require('../models/product')

let getAllProductsStatic =  async(req, res)=>{
    search = 'first'
    let products = await Product.find({price:{$gt:30}}).sort('price').select('name price').limit(10).skip(1)
    res.status(200).json({products, nbHits: products.length})
}

let getAllProducts=  async(req, res)=>{
    let {featured, company,name,sort,fields, numericFilters} = req.query;
    let queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true'? true : false;
    }
    if(company){
        queryObject.company = company;
    }

    if(name){
        queryObject.name = {$regex: name, $options: 'i'};
    }

 if(numericFilters){
    let operatorMap = {
        '<':'$lt',
        '<=':'$lte',
        '=':'$eq',
        '>':'$gt',
        '>=':'$gte'
    }
let regEx = /\b(<|>|=|>=|<=)\b/g;
let filters = numericFilters.replace(regEx,
    (match)=> `-${operatorMap[match]}-`
)

let options = ['rating','price'];

filters.split(',').forEach((item)=>{
  let [field, operator, value] = item.split('-');

  if(options.includes(field)){
     queryObject[field] = {[operator]: Number(value)};

  }

})


   }
   
console.log(queryObject)

let result = Product.find(queryObject)
   if(sort){
     let sortList = sort.split(',').join(' ');
     result = result.sort(sortList)
   }
   else{
    result = result.sort('createdAt')
   }

   if(fields){
     let fieldsList = fields.split(',').join(' ');
     result = result.select(fieldsList)
   }

     
let page = Number(req.query.page) || 1;
let limit = Number(req.query.limit) || 10;
let skip = (page - 1) * limit;
result = result.skip(skip).limit(limit)

    let products = await result
    
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProducts, getAllProductsStatic}