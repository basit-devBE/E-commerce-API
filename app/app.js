// setup server
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import dotenv from "dotenv";
import userRoutes from '../routes/usersroute.js';

dotenv.config();


const app = express();

// Middleware
app.use(express.json());

// Connect to the database
dbConnect().catch(err => {
  console.error('Failed to connect to the database', err);
  process.exit(1); // Exit the process with failure code
});

//routes
app.use('/', userRoutes)

// Export the app
export default app;
