const pgp = require('pg-promise')();
//db connect string
const db = pgp(process.env.DATABASE_URL);

const PrpSt = require('pg-promise').PreparedStatement;
const prpSql = {};

prpSql.findUser = new PrpSt('findUser',`SELECT *FROM public."users" WHERE username=$1`);

prpSql.createUser = new PrpSt('createUser',`INSERT INTO public."users" ("id", "email", "username", "hash") VALUES (DEFAULT, $1, $2, $3) RETURNING "id", "email", "username", "hash"`)

//export module
module.exports.db = db; //db connection
module.exports.prpSql = prpSql; //prepared sql statements