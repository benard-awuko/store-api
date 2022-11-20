require('dotenv').config();

let connectDB = require('./db/connect');
let Product = require('./models/product');
let jsonProducts = require('./products.json');

let start = async()=>{
try{
await connectDB(process.env.MONGO_URI);
await Product.deleteMany();
await Product.create(jsonProducts)
console.log('Success');
process.exit(0);
}
catch(error){
console.log(error)
process.exit(1);
}

}

start();