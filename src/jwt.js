const jwt=require('jsonwebtoken')


function createToken(data){
    const token=jwt.sign({...data},'secret123',{expiresIn:'1h'})
    return token
}
function verifyToken(token){
    const verify=jwt.verify(token,'secret123')
    return verify.id
}
module.exports={createToken,verifyToken}