require("express-async-errors"); // necessary to use "new Error"

const AppError = require("./utils/AppError"); // import class AppError

const express = require("express"); // pega as funcionalidades do express

const app = express(); // initialize express

const routes = require("./routes"); // access to routes (index.js)

const migrationsRun = require("./database/sqlite/migrations"); // process of create tables  

migrationsRun(); // run database

app.use(express.json()); // informa para o insomnia o formato que no caso é json

app.use(routes); // use resource "routes"

app.use( ( error,request, response, next ) =>{

  if(error instanceof AppError){ // user error  
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({ // server error
    status: "error",
    message: "internal server error"
  })

})

const PORT = 3333;  
app.listen(PORT, ()=>{ // executa funções nessa porta 
  console.log(`Server is running on ${PORT}`);
})



/*
get - read data
post - create data
putt - update data
delete - delete data
patch - specific update
*/ 