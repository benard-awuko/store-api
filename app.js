require('dotenv').config();
//async error
require('express-async-errors')

let express = require('express');
let connectDB = require('./db/connect')
let app = express();

let products = require('./routes/products')

let notFoundMiddleWare = require('./middleware/not-found');
let errorMiddleWre = require('./middleware/error-handler');

app.get('/',(req,res)=>{
    res.send('<h1>Stores API</h1> <a href="/api/v1/products">Products Route</a>')
})

app.use('/api/v1/products', products)



//Middleware
app.use(express.json())
app.use(errorMiddleWre)
app.use(notFoundMiddleWare)

let port = process.env.PORT || 3000;


let start = async()=>{
        try {
           await connectDB(process.env.MONGO_URI)
           app.listen(port,()=>{
           console.log(`Listening on port ${port}...`);
})
        } catch (error) {
            console.log(error)
        }


}


start();



