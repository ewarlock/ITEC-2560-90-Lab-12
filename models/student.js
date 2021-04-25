module.exports = (sequelize, DataTypes) => {
    //structure of Student table...
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false, //make sure some data is always added
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true //all values unique
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    //when true forces table drop every time app restarts, needed if schema changes
    Student.sync({force: false}).then( () =>
    console.log('Synced student table '))

    return Student
}