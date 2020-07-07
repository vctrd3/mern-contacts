const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('get all contacts')
})

router.post('/', (req, res) => {
  res.send('add a new contact')
})

router.delete('/:id', (req, res) => {
  res.send('delete a contact')
})

router.put('/:id', (req, res) => {
  res.send('upadte a contact')
})

module.exports = router