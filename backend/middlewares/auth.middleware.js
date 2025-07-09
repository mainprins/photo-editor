const jwt = require("jsonwebtoken");

const checkAuth = (req,res,next)=>{
     const token = req.cookies.token;

     if(!token){
        return res.status(401).json({error: "No token,Authorization denied."});
     }

     try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
     } catch (error) {
        res.status(403).json({error:"Token is not valid."});
     }
}

module.exports = checkAuth