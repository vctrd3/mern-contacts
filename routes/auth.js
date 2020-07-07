const router = require('express').Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select('-password') //return id without password
    res.json(user)
  }catch{
    
  }
})

//auth user and get token
router.post('/',[
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
  ], 
  async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;
  try{
    let user = await User.findOne({ email })
    if(!user){
      return res.status(400).json({ msg: 'Invalid Email'})
    }
    //bcrypt compare pswd
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({ msg: 'Invalid Password'})
    }

    const payload = {
      user:{ id: user.id }
    }

    jwt.sign(payload, keys.jwtSecret, {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      res.json({token})
    })

  }catch(err){console.error(err.message)
    res.status(500).send('Server error')
  }

  
})

module.exports = router