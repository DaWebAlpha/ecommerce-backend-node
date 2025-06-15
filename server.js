import express from 'express'
import { cors } from './middleware/cor.js'
import { handleError } from './middleware/handleError.js';
import { notFound } from './middleware/notFound.js';
import productRouter from './routes/productroutes.js';
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Basic middlewares
app.use(cors);
app.use(express.json()); 


app.use('/', productRouter)

//Error handlers
app.use(notFound)
app.use(handleError)

app.listen(PORT, ()=>console.log(`SERVER on PORT ${PORT}`))

