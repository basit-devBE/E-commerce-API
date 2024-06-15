export const getTokenFromHeader = (req, res) =>{
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token){
       return "No token found"
    }else{
        return token;
    }
}

export default getTokenFromHeader;