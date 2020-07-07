const router = require('express').Router()

router.post('/', (req, res) => {
  res.send('Register a new user')
})

module.exports = router