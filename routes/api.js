let express = require('express')
let db = require('../models') //grabs index.js by default
let Student = db.Student //ref to Student model

//match requests to function that responds to request
let router = express.Router()

router.get('/students', function(req, res, next) {
    Student.findAll().then(students => {
        //return from inside promise, array of students to json
        return res.json()
    })
})

//post creates, patch modifies, delete deletes, get fetches

router.post('/students', function(req, res, next) {
    //body is any json that vue client has set in request
    Student.create( req.body ).then (data => {
        //must always send response! like a confirmation of success
        //status code... 201 is convention when something is created
        return res.status(201).send('ok created')
    })
})

module.exports = router //make router available to rest of project