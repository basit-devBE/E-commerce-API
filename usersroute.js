import express from 'express'
import { registerUser } from '../controllers/users.controllers.js';

const userRoutes = express.Router();

userRoutes.get('/api/v1/users/register', registerUser);

export default userRoutes;