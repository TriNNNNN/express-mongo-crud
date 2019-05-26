const mongoose = require('mongoose')

let employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'Name is mandatory'
  },
  email: {
    type: String,
    required: 'Email is mandatory'
  },
  mobile: {
    type: String
  },
  city: {
    type: String
  }
})

employeeSchema.path('email').validate(val => {
  emailRegex = /^([0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,10})$/
  return emailRegex.test(val)
}, 'Invalid email format')

mongoose.model('Employee', employeeSchema)
