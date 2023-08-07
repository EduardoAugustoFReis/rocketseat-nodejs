const {hash, compare} = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite"); // connection with database

class UsersController{

  async create(request, response){ // create new data user
    const {name, email, password} = request.body; // body insomnia
    
    const database = await sqliteConnection();// start connection with database

    // search for information's, get email user
    const checkUserExists = await database.get("select * from users where email = (?)", [email]);
    
    if(checkUserExists){ // check email has already been used
      throw new AppError("Este email já eatá em uso");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "insert into users (name, email, password) values (?, ?, ?)", [name, email, hashedPassword]
    );

    return response.json();

  }

  async update(request, response){
    const {name, email, password, old_password} = request.body; //insomnia body
    const {id} = request.params;

    const database = await sqliteConnection(); //connection with database

    // search id that I want to know
    const user = await database.get("select * from users where id = (?)", [id] );

    if(!user){ // id don't exists
      throw new AppError("Usuário não encontrado.");
    }

    const userWithUpdateEmail = await database.get("select * from users where email = (?)", [email] );

    // check if email already been exists 
    if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id ){
      throw new AppError("Este email já está em uso");
    }

    user.name = name ?? user.name; // new name
    user.email = email ?? user.email; // new email

    // new password has been informed, but the old password not 
    if(password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para definir a nova");
    }

    // password and old password has been informed
    if(password && old_password){ // comparison between old and new password
      const checkOldPassword = await compare(old_password, user.password);
      
      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8); 
    }
    
    await database.run(`
      update users set 
      name = ?, 
      email = ?,
      password = ?,
      update_at = DATETIME('now')
      where id = ?`, [user.name, user.email, user.password, id] );

      return response.json();
  }
}

module.exports = UsersController;

/* 
get -> data list (index)
get -> show data (show)
post -> create data
putt -> update data
delete -> delete data
*/