import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { setupAuth } from './authentication/auth.js';
import { cors } from './middleware/cor.js';
import { handleError } from './middleware/handleError.js';
import { notFound } from './middleware/notFound.js';
import orderRouter from './routes/orderRoutes.js';
import productRouter from './routes/productroutes.js';
import resetRoutes from './routes/resetRoutes.js';
import pageRoutes from './routes/pageRoutes.js'; 
import methodOverride from 'method-override';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));

setupAuth(app); // register login logout

// ✅ Navigation (page) routes
app.use('/', pageRoutes);

// ✅ API routes
app.use('/', productRouter);
app.use('/', orderRouter);
app.use('/', resetRoutes);

// ✅ Error handlers
app.use(notFound);
app.use(handleError);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
