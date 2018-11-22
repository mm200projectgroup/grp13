const pgp = require('pg-promise')();
//db connect string
const db = pgp(process.env.DATABASE_URL);

const PrpSt = require('pg-promise').PreparedStatement;
const prpSql = {};

//Find user by email or username
prpSql.findUser = new PrpSt('findUser',`SELECT *FROM public."users" WHERE username=$1 OR email=$2`);

//Find hash
prpSql.getHash = new PrpSt('getHash', 'SELECT hash, id FROM public."users" WHERE (username = $1 OR email = $1) AND active = true');

//Edit user
prpSql.editEmail = new PrpSt('editEmail', 'UPDATE public."users" SET email = $1 WHERE username = $2');

prpSql.editUser = new PrpSt('editUser','UPDATE public."users" SET username = $1 WHERE username = $2');

prpSql.editPassword = new PrpSt('editPassword', 'UPDATE public."users" SET hash = $1 WHERE username = $2');

prpSql.deleteUser = new PrpSt('deleteUser', 'UPDATE public."users" SET active = FALSE WHERE username = $1');
//--------

prpSql.createUser = new PrpSt('createUser',`INSERT INTO public."users" ("id", "email", "username", "hash", "role", "active") VALUES (DEFAULT, $1, $2, $3, DEFAULT, DEFAULT) RETURNING "id", "email", "username", "hash", "role", "active"`);


//Presentation------------

prpSql.newPresentation = new PrpSt('newPresentation', `INSERT INTO public."presentation" ("presentationid", "titel", "slides", "ownerid") VALUES (DEFAULT, $1, $2, $3) RETURNING "presentationid", "titel", "slides", "ownerid"`);

prpSql.updatePresentation = new PrpSt('updatePresentation','UPDATE public."presentation" SET "titel" = $1, "slides" = $2 WHERE "presentationid" = $3 RETURNING "titel", "slides"');

prpSql.getPresentations = new PrpSt('getPresentations','SELECT * FROM public."presentation" WHERE "ownerid" = $1');

prpSql.sharePresentation = new PrpSt('sharePresentation', 'UPDATE public."presentation" SET "ownerid" = CONCAT("ownerid", $1::text) WHERE "presentationid" = $2');

prpSql.makePublic = new PrpSt('makePublic', `UPDATE public."presentation" SET ownerid = 'public' WHERE "presentationid" = $1`);

prpSql.getPublic = new PrpSt('getPublic', 'SELECT * FROM public."presentation" WHERE "ownerid" = public');

//export module
module.exports.db = db; //db connection
module.exports.prpSql = prpSql; //prepared sql statements