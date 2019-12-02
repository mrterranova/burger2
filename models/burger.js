//export burger model as sequelized object
module.exports = (sequelize, DataTypes) => {
    //create a data table called "burger"
    let Burger = sequelize.define("burger", {
        //the following fields located in the table
        burger_name: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                len: [1, 40]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        deleted: {
            type: DataTypes.BOOLEAN, 
            allowNull: false
        }
    });

    //associate burgers with comments 
    Burger.associate = models => {
        Burger.hasMany(models.Comments, {
            onDelete: "Cascade"
        });
    };
    
    //send object "Burger"
    return Burger;
}