import express from 'express'
import { ensureAdmin, ensureUser } from '../middleware/authmiddleware.js'

import {
  createOrder,
  listOrders,
  deleteAllOrders,
  deleteOrderById 
} from '../controllers/orderController.js'

const orderRouter = express.Router()

// ✅ User-accessible order routes
orderRouter.get('/orders', ensureUser(), listOrders);
orderRouter.post('/orders', ensureUser(), createOrder);
orderRouter.delete('/orders', ensureUser(), deleteAllOrders);
orderRouter.delete('/orders/:id', ensureUser(), deleteOrderById);

export default orderRouter;