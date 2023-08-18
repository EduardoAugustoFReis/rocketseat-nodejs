const knex = require("../database/knex");

class Movie_tagController{

  async index(request, response){
    const {user_id} = request.params;

    // search for "movie_tags"
    const tags = await knex("movie_tags")
    .where( {user_id}); // search data referent user_id insomnia params 

    return response.json(tags);
  }

  async delete(request, response){
    const {user_id} = request.params;
    
    await knex("movie_tags").where( {user_id} ).delete();

    return response.json();
  }
}

module.exports = Movie_tagController;