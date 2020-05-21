module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define("history", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        problemid: {
            type: Sequelize.INTEGER,
            references: {
                model:'item',
                key:'id'
            }
        },
        date: {
            type: Sequelize.DATEONLY,            
        },
        comment: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
    })

    return History;
};