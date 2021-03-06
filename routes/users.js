const router = require('express').Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

/// 'api/users' route
router.post('/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
  ], 
  async (req, res) => {

  const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
  }
  const { name, email , password } = req.body;
  
  try{
    let user = await User.findOne({ email })
    if(user){
      return res.status(400).json({ msg: 'User already exists'})
    }
    user = new User({ name, email , password})

    //hash+salt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save()

    //configure jwt
    const payload = {
      user:{ id: user.id }
    }

    jwt.sign(payload, keys.jwtSecret, {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      res.json({token})
    })

  }catch(err){
    console.log(err.msg)
  }
  
})

module.exports = router