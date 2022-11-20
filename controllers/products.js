let Product = require('../models/product')

let getAllProductsStatic =  async(req, res)=>{
    let products = await Product.find({name:"high-back bench"})
    res.status(200).json({products, nbHits: products.length})
}

let getAllProducts=  async(req, res)=>{
 let products = await Product.find(req.query)
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {getAllProducts, getAllProductsStatic}