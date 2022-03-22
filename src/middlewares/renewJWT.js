const { response } = require("express")
const jwt = require('jsonwebtoken')


const validateJWT = (req,res= response,next) => {
    //The jwt from the user will come from the headers as x-token
    const token = req.header('x-token')

    // console.log(token)
    if(!token) return res.status(401).json({msg: 'No token, authorization denied'})

    try{

        const {uid,name} = jwt.verify(token, process.env.JWT_SEED)
        
        req.uid = uid;
        req.name= name;
    }catch(err){
        console.log(err)
        return res.status(401).json({msg: 'Token is not valid'})
    }


    next();


}



module.exports = {
    validateJWT
}