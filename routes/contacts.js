const router = require('express').Router()
const Contact = require('../models/Contact')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const auth = require('../middlewares/auth')

router.get('/',auth, async (req, res) => {
  try{
    const contacts = await Contact.find({ user: req.user.id }).sort({date: -1})
    res.json(contacts)
  }catch{

  }
})

router.post('/',[auth, 
  check('name', 'Name is required').not().isEmpty()
  ], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
  return res.status(400).json({ errors: errors.array() })
  }
  const { name, email, phone, type } = req.body
  try{
  const newContact = new Contact({
    user: req.user.id,
    name,
    email,
    phone,
    type
  })
  const contact = await newContact.save()
  res.json(contact)
  }catch{}
  })

router.delete('/:id',auth, async (req, res) => {
  try{
    let contact = await Contact.findById(req.params.id)

    if(!contact) return res.status(404).json({msg: 'Contact not found'})

    //making sure user owns contact
    if(contact.user.toString() !== req.user.id){
      return res.status(404).json({msg:'Not authorized'})
    }

    contact = await Contact.findByIdAndDelete(req.params.id)
      res.json({msg:' Contact deleted'})
  }catch(err){
    console.log(err.msg)
  }
})

router.put('/:id',auth, async (req, res) => {
  const { name, email, phone, type } = req.body

  //build a contact object
  const contactFields = {};
  if(name) contactFields.name = name
  if(email) contactFields.email = email
  if(phone) contactFields.phone = phone
  if(type) contactFields.type = type
  
  try{
    let contact = await Contact.findById(req.params.id)

    if(!contact) return res.status(404).json({msg: 'Contact not found'})

    //making sure user owns contact
    if(contact.user.toString() !== req.user.id){
      return res.status(404).json({msg:'Not authorized'})
    }

    contact = await Contact.findByIdAndUpdate(req.params.id,
        { $set: contactFields },
        { new: true}
      )
      res.json(contact)
  }catch{

  }
})

module.exports = router