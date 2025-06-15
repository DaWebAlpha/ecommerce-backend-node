import express from 'express';
import { ensureAdmin, ensureUser } from '../middleware/authmiddleware.js';
import {
  listProducts,
  listSingleProduct,
  createProduct,
  editProduct,
  deleteProduct,
  deleteAllProduct
} from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.get('/admin/products', ensureAdmin(), listProducts);
productRouter.get('/admin/products/:id', ensureAdmin(), listSingleProduct);
productRouter.post('/admin/products', ensureAdmin(), createProduct());
productRouter.put('/admin/products/:id', ensureAdmin(), editProduct());
productRouter.delete('/admin/products/:id', ensureAdmin(), deleteProduct());
productRouter.delete('/admin/products', ensureAdmin(), deleteAllProduct());

productRouter.get('/products', ensureUser(), listProducts);
productRouter.get('/products/:id', ensureUser(), listSingleProduct);

export default productRouter;
