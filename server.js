let express = require('express')
let api_routes = require('./routes/api.js')

//create web app
let app = express()

//handle JSON requests, convert to JS
app.use(express.json())

app.use('/api', api_routes)

//start server
let server = app.listen(process.env.PORT || 3000, () => 
    console.log('express server running on port ', server.address().port))

