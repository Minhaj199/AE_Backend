const { verifyToken } = require("../jwt")



function auth(req,res,next){
    try {
    const token=req.headers['token']
    const isValid=verifyToken(token)
    if(isValid){
      next()
    } 
    } catch (error) {
        res.status(400).json({message:'validation failed'})
    }
  
}
module.exports=auth