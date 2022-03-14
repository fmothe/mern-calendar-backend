const express = require("express");
const { dbConnection } = require("./src/database/config");
require("dotenv").config();
//Creo el server de express

const app = express();

//database
dbConnection();

//Directorio publico
app.use(express.static("public"));

app.use(express.json());
//rutas
app.use("/api/auth", require("./src/routes/auth"));
//rutas crud eventos

//lectura y parseo del body


//Escucho request
app.listen(process.env.PORT, () => {
  console.log(`Server running in port ${process.env.PORT}`);
});
