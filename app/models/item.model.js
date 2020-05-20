module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        },
        diff: {
            type: Sequelize.ENUM,
            values: ['easy', 'medium', 'hard']
        },
        type1: {
            type: Sequelize.STRING
        },
        type2: {
            type: Sequelize.STRING
        },
        type3: {
            type: Sequelize.STRING
        },
        grasp: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
    })

    return Item;
};