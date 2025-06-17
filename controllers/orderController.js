import { Order } from '../models/orderModels.js';
import { autoCatchFn } from '../lib/autoCatchFn.js';
import { ensureUser } from '../middleware/authmiddleware.js';

// ✅ Create a new order
export const createOrder = autoCatchFn(async function (req, res) {
  const { items } = req.body;
  const buyerEmail = req.user?.email;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one item' });
  }

  const order = new Order({ items, buyerEmail });
  await order.save();

  res.status(201).json({
    success: true,
    order: {
      id: order._id,
      items: order.items,
      buyerEmail: order.buyerEmail,
      createdAt: order.createdAt
    }
  });
});

// ✅ List all orders for the current user
export const listOrders = autoCatchFn(async function (req, res) {
  const buyerEmail = req.user?.email;
  const orders = await Order.find({ buyerEmail }).sort({ createdAt: -1 });
  res.json(orders);
});

// ✅ Delete all orders for the current user
export const deleteAllOrders = autoCatchFn(async function (req, res) {
  const buyerEmail = req.user?.email;
  const result = await Order.deleteMany({ buyerEmail });
  res.json({ success: true, deletedCount: result.deletedCount });
});

// ✅ Delete a specific order by ID (only if it belongs to the user)
export const deleteOrderById = autoCatchFn(async function (req, res) {
  const buyerEmail = req.user?.email;
  const { id } = req.params;

  const order = await Order.findOneAndDelete({ _id: id, buyerEmail });
  if (!order) {
    return res.status(404).json({ error: 'Order not found or not yours' });
  }

  res.json({ success: true, deletedOrderId: order._id });
});
