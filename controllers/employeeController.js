const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  // res.json('sample text')
  res.render('employee/addOrEdit', {
    viewTitle: 'Insert Employee'
  })
})

router.post('/', (req, res) => {
  console.log(req.body)
})

module.exports = router
