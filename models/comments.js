//export burger model as sequelized object
module.exports = (sequelize, DataTypes) => {
    //create a data table called "comments"
    var Comments = sequelize.define("Comments", {
        //the following fields located in the table
        customer: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        comment: {
            type: DataTypes.TEXT, 
            allowNull: false,
            validate: {
                len: [1,100]
            }
        },
        stars: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }
    });

    //Object comments associated with burger
    Comments.associate = models => {
        Comments.belongsTo(models.Burger, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    //return object Comments
    return Comments;
}