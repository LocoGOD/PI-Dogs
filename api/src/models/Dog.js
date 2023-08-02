const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,               //Identificador unico, clave tipo UUID 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,  
      primaryKey: true}, 
    name: {
      type: DataTypes.STRING,             
      allowNull: false,        
      unique: true                        // Nombre debe ser unico
    },            
    height:{
      type: DataTypes.STRING,             // Altura que sera un string combinando los pesos minimos y maximos enviados en el form
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,             // Peso que sera un string combinando los pesos minimos y maximos enviados en el form
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING
    },
    created:{                   
      type: DataTypes.BOOLEAN,            // Propiedad created para identificar perros de la DB de los de la API
      defaultValue: true,
      allowNull: false
    }
  },
  {timestamps:false})   // Impide la creacion de 2 columnas adicionales en la tabla, que muestran fecha de creacion y actualizacion
};
