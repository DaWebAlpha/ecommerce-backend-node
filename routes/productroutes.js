import express from 'express'
import { 
    listProducts 
} from "../controllers/productControllers.js";
import { getDataFromDb } from "../config/db1.js";

const productRouter = express.Router();

productRouter.get('/products', listProducts(getDataFromDb))

export default productRouter;
