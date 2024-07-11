require('dotenv').config()

const jwt = require('jsonwebtoken')

async function verifyToken(req, res, next){
    const token = req.cookies.token
    console.log(token)
    if(!token){
        return res.json({message: 'PLease auth!1'})
    }

    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            console.log(err.message)
            return new Error(err.message)
        }
        req.user =  decoded.userId
        next()
    })
}

module.exports = {verifyToken}