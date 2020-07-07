const mongoose = require('mongoose');
const Schema = mongoose.Schema

const contactSchema = new Schema({
  user:{type: mongoose.Schema.Types.ObjectId},
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String},
  type:{type:String, default: 'personal'},
  date: {type: Date, default: Date.now()}
})

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact