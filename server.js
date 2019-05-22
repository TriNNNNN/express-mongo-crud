require('./models/db')

const express = require('express')
const path = require('path')
const expresshbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', expresshbs({
  extname: 'hbs',
  defaultLayout: 'mainLayout',
  layoutsDir: path.join(__dirname, '/views/layouts/')
}))
app.set('view engine', 'hbs')

const employeeCtrl = require('./controllers/employeeController')

app.use('/employee', employeeCtrl)

app.listen(3000, () => {
  console.log('express server started at port 3000')
})
