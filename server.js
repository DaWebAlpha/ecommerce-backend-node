import express from 'express'
import cors from 'cors'
import {
    getDataFromDb
} from './config/db1.js'

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Basic middlewares
app.use(cors());
app.use(express.json()); 


/* const listProducts = async function(req, res){
    const data = await getDataFromDb();
    try{
        res.json(data)
    }catch(err){
        res.status(500).json({error: err.message})
    }
} */

const listProducts = async function(req, res){
    const data = await getDataFromDb()
    if(data){
        return res.json({data: data, Length: data.length})
    }else{
        res.status(500).json({error: err.message})
    }
}


app.get('/products', listProducts);


app.listen(PORT, ()=>console.log(`SERVER on PORT ${PORT}`))

