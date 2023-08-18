const knex = require("../database/knex"); // import knex


class Movie_noteController{

  async create(request, response){
    const {title, description, rating, movie_tags} = request.body; //get data body "insomnia"
    const {user_id} = request.params; // get params by "insomnia" 

    const {note_id} = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })
    
    const tagsInsert = movie_tags.map( name =>{
      return{
        note_id,
        user_id,
        name
      } 
    })

    await knex("movie_tags").insert(tagsInsert);

    return response.json();
  } 

  async show(request, response){
     const {id} = request.params;

     const note = await knex("movie_notes").where( {id} ).first();

     return response.json(note);
  }

  async delete(request, response){
    const {id} = request.params;

    await knex("movie_notes").where( {id} ).delete();

    return response.json();
  }
}

module.exports = Movie_noteController;