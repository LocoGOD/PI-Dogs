const server = require("./src/app");
const {conn} = require('./src/db.js');

conn.sync({force:true}).then(    // La ejecutamos con el comando sync, junto con un parametro de objeto "force" que sirve para forzar
//un reinicio en la tabla en caso de que editemos datos, importante que todo esto este antes de que inicie el servidor, por eso el .then 
      () => console.log("Database Connected"),  // Console log para verificar que base de datos se conecta exitosamente
      server.listen(3001, ()=>{console.log("Server on port 3001!");}) //levantamos con puerto 3001 y mensaje en consola.
  )   
