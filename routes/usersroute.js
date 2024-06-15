import express from 'express'
import { getUserProfileCtrl, LoginUserCtrl, registerUser } from '../controllers/users.controllers.js';
import { isLoggedIn } from '../middlewares/isloggedin.js';

const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register', registerUser);
userRoutes.post('/api/v1/users/login', LoginUserCtrl );
userRoutes.get('/api/v1/users/Profile',isLoggedIn, getUserProfileCtrl)

export default userRoutes;