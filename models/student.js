module.exports = (sequelize, DataTypes) => {
    //structure of Student table...
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING
        },
        starID: {
            type: DataTypes.STRING
        },
        present: {
            type: DataTypes.BOOLEAN
        }
    })

    //when true forces table drop every time app restarts, needed if schema changes
    Student.sync({force: true}).then( () =>
    console.log('Synced student table '))

    return Student
}