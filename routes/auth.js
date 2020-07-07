const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('get logged in user')
})

//auth user and get token
router.post('/', (req, res) => {
  res.send('login user')
})

module.exports = router