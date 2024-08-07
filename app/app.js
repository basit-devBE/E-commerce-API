// setup server
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import dotenv from "dotenv";
import userRoutes from '../routes/usersroute.js';
import { globalErrhandler,notFound } from '../middlewares/globalErrorHandler.js';
import ProductRoutes from '../routes/productroute.js';
import CategoryRouter from '../routes/categoryrouter.js';
import BrandRouter from '../routes/brandroutes.js';
import ColourRouter from '../routes/coloroute.js';
import Reviewroute from '../routes/reviewroute.js';
import OrderRouter from '../routes/OrderRouter.js';


dotenv.config();


const app = express();

// Middleware
app.use(express.json());

// Connect to the database
dbConnect().catch(err => {
  console.error('Failed to connect to the database', err);
  process.exit(1); // Exit the process with failure code
});

app.use(express.json())

//routes
app.use('/', userRoutes)
app.use('/', ProductRoutes)
app.use('/', CategoryRouter)
app.use('/', BrandRouter)
app.use('/', ColourRouter)
app.use('/', Reviewroute)
app.use('/', OrderRouter)

app.use(notFound)
app.use(globalErrhandler)
// Export the app
export default app;
