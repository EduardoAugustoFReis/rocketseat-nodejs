const AppError = require("../utils/AppError");

const {hash, compare} = require("bcryptjs");

const sqliteConnection = require("../database/sqlite"); // connection with database
const { use } = require("express/lib/router");
const { response } = require("express");

class UsersController{
  
  async create(request, response){
    const {name, email, password} = request.body;

    const database = await sqliteConnection(); // run connection with database

    // get user by email
    const checkUserExists = await database.get("select * from users where email = (?)", [email]);

    if(checkUserExists){
      throw new AppError("Este e-mail já está em uso!");
    }

    const hashPassword = await hash(password, 8);

    // insert users
    await database.run(
      "insert into users (name, email, password) values (?,?,?)", 
      [name, email, hashPassword]
    )
    
    return response.json();
  }

  async update(request, response){
    const {name, email, new_password, old_password} = request.body;
    const {id} = request.params; // get "id" by route params
    
    const database = await sqliteConnection(); // start connections with database

    // get "user" by id, user: name, email, password, avatar, created and updated_at 
    const user = await database.get("select * from users where id = (?)", [id]);

    if(!user){ // if user don't exists
      throw new AppError("Usuário não encontrado!");
    }
    
    // get updated email (new email)
    const updatedEmail = await database.get("select * from users where email = (?)", [email]);
  
    // verify if "updated email" (new email created) already in use (other email already created)
    if(updatedEmail && updatedEmail.id !== user.id){
      throw new AppError("Este e-mail já está em uso!");
    }

    // inform new password but not old password
    if(new_password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha!");
    }

    // inform old and new password
    if(new_password && old_password){ // compare old and new password
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere!");
      }

      user.password = await hash(new_password, 8); 
    }

    user.name = name ?? user.name; 
    user.email = email ?? user.email;

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