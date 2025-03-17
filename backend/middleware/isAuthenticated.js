import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) =>{
  try{
      const token = req.cookies.token;
      console.log("Auth Token:", token); // ✅ Debugging

      if(!token){
        return res.status(400).json({msg: "User not authenticated"});
      }

      const decode = await jwt.verify(token, process.env.SECRET_KEY);
      console.log("Decoded Token:", decode); // ✅ Debugging

      if(!decode){
        return res.status(400).json({msg: "Invalid token"});
      }
      
      req.id = decode.userId;
      next();
    }
  catch(error){
    console.log(error);
    return res.status(401).json({msg: "Not Authorized"})
  }
}

export default isAuthenticated