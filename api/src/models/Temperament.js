const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    id:{
      type: DataTypes.INTEGER,       
      autoIncrement: true,      
      primaryKey: true,         //Sera la llave primaria
      allowNull: false},        
    name: {
      type: DataTypes.STRING,   
      allowNull: false,         
      unique: true},            // Nombre debe ser único
  },
  {timestamps:false})   // Impide la creacion de 2 columnas adicionales en la tabla, que muestran fecha de creacion y actualizacion
};
