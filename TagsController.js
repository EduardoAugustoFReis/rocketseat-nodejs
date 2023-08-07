const knex = require("../database/knex"); // import knex

class TagsController{
  
  async index(request, response){
    const { user_id } = request.params;

    const tags = await knex("tags") // get table "tags"
    .where({user_id}) // filter by user_id

    return response.json(tags);

  }
}

module.exports = TagsController;