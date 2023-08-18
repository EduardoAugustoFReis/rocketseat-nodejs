require("express-async-errors"); 

const AppError = require("./utils/AppError"); // import class

const express = require("express"); // import express 

const app = express(); // initialize express

app.use(express.json()); // use json format

const routes = require("./routes"); // import routes(folder)

app.use(routes); // use routes

const migrationRun = require("./database/sqlite/migrations") // import migration 

migrationRun(); // run database  

app.use( (error, request, response, next) =>{

  if(error instanceof AppError){ // client error
    return response.status(error.statusCode).json({ // ex: error.statusCode = 400 
      status: "error",
      message: error.message // message throw new AppError("...") 
    })
  }

  return response.status(500).json({ // server error
    status: "error",
    message: "Internal server error"
  })
})

const PORT = 3333;
app.listen(PORT, ()=>{
  console.log(`Server is running on Port ${PORT}`);
})
