const express = require('express')
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('sample text')
  // res.render('employee/addOrEdit', {
  //   viewTitle: 'Insert Employee'
  // })
})

router.post('/', (req, res) => {
  console.log(req.body)
  if (typeof req.body._id === 'undefined' || req.body._id !== '') {
    insertRecord(req, res)
  } else {
    updateRecord(req, res)
  }
})

router.get('/list', (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.send({
        status: 'success',
        message: 'records fetched success',
        data: {
          employeeDetails: docs
        },
        error: []
      })
      // res.render('employee/list', {
      //   list: docs
      // })
    } else {
      res.send({
        status: 'fail',
        message: 'Error in retreiving employee list',
        data: [],
        error: [
          {
            code: 103,
            errStack: err
          }
        ]
      })
      console.log('Error in retreiving employee list')
    }
  })
})

router.get('/:id', (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc)
      // res.render('employee/addOrEdit', {
      //   viewTitle: 'Update Employee',
      //   employee: doc
      // })
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

function insertRecord (req, res) {
  let employee = new Employee()
  employee = Object.assign(employee, {
    fullName: req.body.fullName,
    email: req.body.email,
    mobile: req.body.mobile,
    city: req.body.city
  })
  console.log('employee--->',employee)
  employee.save((err, doc) => {
    if (!err) {
      res.send({
        status: 'success',
        message: 'record saved successfully',
        data: doc,
        error: []
      })
      // res.redirect('employee/list')
    } else {
      if (err.name.toLowerCase() === 'validationerror') {
        handleValidationError(err, req.body)
        res.send({
          status: 'fail',
          message: 'failed to store record',
          data: {},
          error: [{
            code: 101,
            errStack: err
          }]
        })
        // res.render('employee/addOrEdit', {
        //   viewTitle: 'Insert Employee',
        //   employee: req.body
        // })
      } else {
        res.send({
          status: 'fail',
          message: 'Error while inserting record',
          data: {},
          error: [{
            code: 102,
            msg: err
          }]
        })
      }
    }
  })
}

function updateRecord (req, res) {
  console.log('came here')
  Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if (!err) {
      res.send(doc)
      // res.redirect('employee/list')
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

module.exports = router
