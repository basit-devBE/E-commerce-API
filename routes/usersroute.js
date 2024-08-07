import express from 'express'
import { getallusers, getUserProfileCtrl, LoginUserCtrl, registerUser, updateShippingAddress } from '../controllers/users.controllers.js';
import { isLoggedIn } from '../middlewares/isloggedin.js';

const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register', registerUser);
userRoutes.post('/api/v1/users/login', LoginUserCtrl );
userRoutes.get('/api/v1/users/Profile',isLoggedIn, getUserProfileCtrl)
userRoutes.get('/api/v1/users/getallusers', getallusers)
userRoutes.put('/api/v1/users/updateshipping', isLoggedIn, updateShippingAddress)

export default userRoutes;