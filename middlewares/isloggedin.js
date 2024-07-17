import getTokenFromHeader from "../utils/getToken.js";
import {verifyToken} from "../utils/verifytoken.js"

export const isLoggedIn = (req,res,next) =>{
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);
    if(!decodedUser){
        throw new Error("Invalid/Expired token,please login again")
        }
    else{
        req.userAuthId = decodedUser?.id
        next();
    }
}