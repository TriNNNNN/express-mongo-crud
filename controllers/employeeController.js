const express = require('express')
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

const router = express.Router()

router.get('/', (req, res) => {
  // res.json('sample text')
  res.render('employee/addOrEdit', {
    viewTitle: 'Insert Employee'
  })
})

router.post('/', (req, res) => {
  if (req.body._id == '') {
    insertRecord(req, res)
  } else {
    updateRecord(req, res)
  }
})

function insertRecord (req, res) {
  let employee = new Employee()
  employee = Object.assign(employee, {
    fullName: req.body.fullName,
    email: req.body.email,
    mobile: req.body.mobile,
    city: req.body.city
  })
  employee.save((err, doc) => {
    if (!err) {
      res.redirect('employee/list')
    } else {
      if (err.name.toLowerCase() === 'validationerror') {
        handleValidationError(err, req.body)
        res.render('employee/addOrEdit', {
          viewTitle: 'Insert Employee',
          employee: req.body
        })
      } else {
        console.log('Error while inserting record', err)
      }
    }
  })
}

function updateRecord (req, res) {
  Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.redirect('employee/list')
    } else {
      if (err.name.toLowerCase() === 'validationerror') {
        handleValidationError(err, req.body)
        res.render('employee/addOrEdit', {
          viewTitle: 'Update Employee',
          employee: req.body
        })
      } else {
        console.log('Error during record update', err)
      }
    }
  })
}

function handleValidationError (err, body) {
  for (let field in err.errors) {
    switch (err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message
        break
      case 'email':
        body['emailError'] = err.errors[field].message
        break
      default:
        break
    }
  }
}

router.get('/list', (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render('employee/list', {
        list: docs
      })
    } else {
      console.log('Error in retreiving employee list')
    }
  })
})

router.get('/:id', (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render('employee/addOrEdit', {
        viewTitle: 'Update Employee',
        employee: doc
      })
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.render('employee/list')
    } else {
      console.log('Failed to delete record')
    }
  })
})

module.exports = router
