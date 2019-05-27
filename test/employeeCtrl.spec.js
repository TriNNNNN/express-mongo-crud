const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

chai.use(chaiHttp)
chai.should()

describe('Test cases for employees controller', function () {
  beforeEach(function (done) {
    var newEmp = new Employee({
      fullName: 'Tushar',
      mobile: '3333333333',
      email: 'tushar@b2x.com',
      city: 'Ghatkopar'
    })

    newEmp.save(function (err, doc) {
      console.log('doc---->', doc)
      done()
    })
  })

  it('1.it should get all books', (done) => {
    chai.request(server)
      .get('/employee/list')
      .end((err, res) => {
        res.body.data.should.be.a('object')
        res.body.error.should.be.a('array')
        res.should.be.json
        done()
      })
  })

  it('2.should add a single record', function (done) {
    chai.request(server)
      .post('/employee')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({'fullName': 'Pratik Tharki2', 'email': 'pratik@b2x.com', 'mobile': '7777777777', 'city': 'Dadar'}))
      .then(res => {
        res.body.status.should.equal('success')
        res.body.data.should.be.a('object')
        res.body.error.should.be.a('array')
        done()
      }, err => {
        done(err)
      })
  })
})
