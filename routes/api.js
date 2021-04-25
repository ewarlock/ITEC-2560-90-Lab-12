let express = require('express')
let db = require('../models') //grabs index.js by default
let Student = db.Student //ref to Student model

//match requests to function that responds to request
let router = express.Router()

router.get('/students', function(req, res, next) {
    //order sorts by fields, in order of fields listed
    Student.findAll( {order: ['present', 'name']} ).then(students => {
        //return from inside promise, array of students to json
        return res.json(students)
    }).catch ( err => next(err))
})

//post creates, patch modifies, delete deletes, get fetches

router.post('/students', function(req, res, next) {
    //body is any json that vue client has set in request
    Student.create( req.body ).then (data => {
        //must always send response! like a confirmation of success
        //status code... 201 is convention when something is created
        return res.status(201).send('ok created')
    }).catch(err => {
        //handle user errors
        if (err instanceof db.Sequelize.ValidationError) {
            //respond with 400 Bad Request error code, error messages
            let messages = err.errors.map(e => e.message) 
            return res.status(400).json(messages) //return json array of sql error messages
        }

        //otherwise something unexpected has gone wrong
        //we already have generic server error handler in server.js
        return next(err) //means this router won't deal with the problem & it will go back to server.js
    })
})

//students/:id gets the id from the server
router.patch('/students/:id', function(req, res, next) {
    let studentID = req.params.id //request is set to students/id
    let updatedStudent = req.body //data sent with request
    Student.update(updatedStudent, { where: { id: studentID } })
        .then( (rowsModified) => {
            let numberOfRowsModified = rowsModified[0] //number of rows changed
            if (numberOfRowsModified == 1) { //good if exactly 1 row changed
                return res.send('student updated')
            } else {
                //student not found/no rows changed
                return res.status(404).json(['Student with that id not found'])
            }
    }).catch (err => {
        //if validation error tell user 404 Bad Request
        if (err instanceof db.Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message) 
            return res.status(400).json(messages)
        } else {
            //unexpected error
            return next(err)
        }
    })
})

//delete student
router.delete('/students/:id', function(req, res, next) {
    let studentID = req.params.id
    Student.destroy({ where: {id: studentID} })
    .then( (rowsDeleted) => {
        if(rowsDeleted == 1) {
            return res.send('student deleted')
        } else {
            return res.status(404).json(['Not found'])
        }
    }).catch(err => next(err))
})

//all configuration must happen before this line
module.exports = router //make router available to rest of project