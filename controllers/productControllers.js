import { autoCatchFn } from '../lib/autoCatchFn.js';
import { Product} from '../models/projectModels.js';
import { User } from '../models/userModels.js'

// --- Helper ---
function forbidden(next) {
  const err = new Error('Forbidden');
  err.statusCode = 403;
  return next(err);
}

// --- Public / Admin Mixed ---

/**
 * Paginate and filter products (using actual DB)
 */
export function createPaginationHandler(dataFetcher) {
  return autoCatchFn(async function handler(req, res) {
    const { offset = 0, limit = 12, tag, prices } = req.query;

    let data = await dataFetcher();

    if (tag) {
      data = data.filter(item => Array.isArray(item.tags) && item.tags.includes(tag));
    }

    if (prices) {
      const maxPrice = Number(prices);
      data = data.filter(item => item.price < maxPrice);
    }

    const paginatedData = data.slice(Number(offset), Number(offset) + Number(limit));
    res.json(paginatedData);
  });
}

/**
 * Get a single product by custom ID
 */
export function singleProduct(dataFetcher) {
  return autoCatchFn(async function getProduct(req, res, next) {
    const { id } = req.params;

    const data = await dataFetcher();
    const product = data.find(p => String(p.id) === String(id));

    if (!product) return next(); // triggers 404 middleware
    res.json(product);
  });
}

// --- Admin-only ---

/**
 * Create a new product
 */
export function createProduct() {
  return autoCatchFn(async function (req, res, next) {
    if (!req.isAdmin) return forbidden(next);

    const product = await Product.create(req.body);
    if (!product) return next();

    res.status(201).json(product);
  });
}

/**
 * Edit product by ID with admin check and validation
 */
export function editProduct() {
  return autoCatchFn(async function (req, res, next) {
    if (!req.isAdmin) return forbidden(next);

    const { id } = req.params;
    const allowedFields = ['title', 'description', 'image', 'price', 'category', 'tags'];
    const update = {};

    for (const key in req.body) {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({ error: `Invalid field: "${key}" is not allowed` });
      }
      update[key] = req.body[key];
    }

    const updated = await Product.findOneAndUpdate({ id }, update, {
      new: true,
      runValidators: true
    });

    if (!updated) return next();
    res.json(updated);
  });
}

/**
 * Delete a product by ID with admin check
 */
export function deleteProduct() {
  return autoCatchFn(async function (req, res, next) {
    if (!req.isAdmin) return forbidden(next);

    const { id } = req.params;
    const deleted = await Product.findOneAndDelete({ id });

    if (!deleted) return next();
    res.json({ success: true, deleted });
  });
}

/**
 * Deletes all products from the database.
 */
export function deleteAllProduct() {
  return autoCatchFn(async function (req, res, next) {
    if (!req.isAdmin) return forbidden(next);

    const deletedAll = await Product.deleteMany({});
    if (deletedAll.deletedCount === 0) return next();
    res.json({ success: true, deletedCount: deletedAll.deletedCount });
  });
}



export const listProducts = createPaginationHandler(() =>
  Product.find().sort({ createdAt: -1 }).lean()
);

export const listSingleProduct = singleProduct(() => Product.find().lean());












