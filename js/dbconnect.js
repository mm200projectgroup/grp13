const pgp = require('pg-promise')();
//db connect string
const db = pgp(process.env.DATABASE_URL);

const PrpSt = require('pg-promise').PreparedStatement;
const prpSql = {};

prpSql.findUser = new PrpSt('findUser',`SELECT *FROM public."users" WHERE username=$1`);
prpSql.editEmail = new PrpSt('editUser', 'UPDATE public."users" SET email = $1 WHERE email = $2');
prpSql.createUser = new PrpSt('createUser',`INSERT INTO public."users" ("id", "email", "username", "hash", "role") VALUES (DEFAULT, $1, $2, $3, $4) RETURNING "id", "email", "username", "hash", "role"`)

//export module
module.exports.db = db; //db connection
module.exports.prpSql = prpSql; //prepared sql statements