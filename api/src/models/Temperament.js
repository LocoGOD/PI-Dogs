const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    id:{
      type: DataTypes.INTEGER,       //Identificador unico
      autoIncrement: true,      //Valor por defecto
      primaryKey: true,         // sera la llave primaria
      allowNull: false},        //Sera la llave primaria
    name: {
      type: DataTypes.STRING,   //nombre sera string
      allowNull: false,         //no puede estar vacio
      unique: true},            //debe ser único
  },
  {timestamps:false})   // impide la creacion de 2 columnas adicionales en la tabla, que muestran fecha de creacion y actualizacion);
};
