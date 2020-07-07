const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token')

  //check if not token
  if(!token){
    return res.status(401).json({msg: 'No token, authorization denied'})
  }

  //if token, verify it
  try{
    const decoded = jwt.verify(token, keys.jwtSecret)
    req.user = decoded.user
    next()
  }catch(err){
    res.status(401).json({msg: 'token not valid'})
  }
}