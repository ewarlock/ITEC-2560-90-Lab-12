let {Sequelize, DataTypes} = require('sequelize')

//sets env either to a variable or to development, depending on presence of variable
//heroku will provide "production"
let env = process.env.NODE_ENV || 'development'

//brings in config.json from main folder... 
//where we set config for production vs development
let config = require(__dirname + '/../config.json')

let db = {}

let sequelize 

if (config.use_env_variable) {
    //new Sequelize object uses database url with info on how to connect to postgres
    //running with Heroku
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    //running locally, just give config
    sequelize = new Sequelize(config.development)
}

//bringing in a function from student.js, use sequelize & DataTypes as parameters
let studentModel = require('./student')(sequelize, DataTypes)

//db model
db[studentModel.name] = studentModel

//sequelize config
db.sequelize = sequelize
//sequelize library
db.Sequelize = Sequelize

module.exports = db