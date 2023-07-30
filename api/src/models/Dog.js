const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    id:{
      type: DataTypes.UUID, //Identificador unico, clave tipo UUID 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,  
      primaryKey: true}, 
    name: {
      type: DataTypes.STRING,   
      allowNull: false,        
      unique: true              
    },            
    height_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.JSON
    },
    created:{                   
      type: DataTypes.BOOLEAN,  
      defaultValue: true,
      allowNull: false
    }
  },
  {timestamps:false})   // impide la creacion de 2 columnas adicionales en la tabla, que muestran fecha de creacion y actualizacion);
};
