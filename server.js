let express = require('express')
let api_routes = require('./routes/api.js')

//create web app
let app = express()

//handle JSON requests, convert to JS
app.use(express.json())

app.use('/api', api_routes)

//runs only if previous app.use doesn't run
app.use(function(req, res, next) {
    //if nothing matches url in api_routes... then this function runs
    res.status(404).send('Not found')
})

//error handling route, web server should try to respond to everything even errors
app.use(function(err, req, res, next) {
    //server errors
    console.error(err.stack) //display stack trace in console
    res.status(500).send('Server error') //500 is general code for server errors
})

//start server
let server = app.listen(process.env.PORT || 3000, () => 
    console.log('express server running on port ', server.address().port))

