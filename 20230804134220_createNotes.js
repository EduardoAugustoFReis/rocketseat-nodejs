
// process of create table
exports.up = knex => knex.schema.createTable("notes", table =>{ 

  table.increments("id");
  table.text("title");
  table.text("description");
  // user_id make reference an "id" on table "users"
  table.integer("user_id").references("id").inTable("users") 

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("update_at").default(knex.fn.now());
}); 
  
// process of drop table (rollback)
exports.down = knex => knex.schema.dropTable("notes");