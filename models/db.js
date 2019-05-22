const mongoose = require('mongoose')

mongoose.connect('mongodb://@ds259806.mlab.com:59806/employeedata', {useNewUrlParser: true}, (err) => {
  if (!err) { console.log('Mongo DB connected successfully') } else { console.log('Error while connecting to database:' + err) }
})

require('./employee.model')