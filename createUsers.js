const createUsers = `
  create table if not exists users(
	  id integer primary key autoincrement,
    name varchar,
    email varchar,
    password varchar,
    avatar varchar,
    create_at timestamp default current_timestamp,
    update_at timestamp default current_timestamp
)
`
module.exports = createUsers;