const pgp = require('pg-promise')();
//db connect string
const db = pgp(process.env.DATABASE_URL);

const PrpSt = require('pg-promise').PreparedStatement;
const prpSql = {};

//Find user by email or username
prpSql.findUser = new PrpSt('findUser',`SELECT *FROM public."users" WHERE username=$1 OR email=$2`);

//Find hash
prpSql.getHash = new PrpSt('getHash', 'SELECT hash FROM public."users" WHERE username = $1');

//Edit user
prpSql.editEmail = new PrpSt('editEmail', 'UPDATE public."users" SET email = $1 WHERE username = $2');

prpSql.editUser = new PrpSt('editUser','UPDATE public."users" SET username = $1 WHERE username = $2');

prpSql.editPassword = new PrpSt('editPassword', 'UPDATE public."users" SET hash = $1 WHERE username = $2');

prpSql.deleteUser = new PrpSt('deleteUser', 'UPDATE public."users" SET role = 0, hash = $2, username = $2, email = $2 WHERE username = $1');
//--------

prpSql.createUser = new PrpSt('createUser',`INSERT INTO public."users" ("id", "email", "username", "hash", "role") VALUES (DEFAULT, $1, $2, $3, $4) RETURNING "id", "email", "username", "hash", "role"`);


//Presentation------------

prpSql.newPresentation = new PrpSt('newPresentation', `INSERT INTO public."presentation" ("presentationid", "titel", "slides") VALUES (DEFAULT, $1, $2) RETURNING "presentationid", "titel", "slides"`);


//export module
module.exports.db = db; //db connection
module.exports.prpSql = prpSql; //prepared sql statements