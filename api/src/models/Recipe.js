const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // dishType: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // dietType: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    dishResume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // score: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    // healthscore: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // steptToStep: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
};
