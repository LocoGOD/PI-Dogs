const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    id:{
      type: DataTypes.UUID, //Identificador unico, clave tipo UUID 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,   //no puede estar vacio
      primaryKey: true},  //Sera la llave primaria
    name: {
      type: DataTypes.STRING,   //nombre sera string
      allowNull: false,         //no puede estar vacio
      unique: true              //debe ser único
    },            
    height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING
    },
    created:{                   // Otorgamos propiedad created para saber si es creado por nosotros o no...
      type: DataTypes.BOOLEAN,  // Sera un booleano en true!
      defaultValue: true
    }
  },
  {timestamps:false})   // impide la creacion de 2 columnas adicionales en la tabla, que muestran fecha de creacion y actualizacion);
};
