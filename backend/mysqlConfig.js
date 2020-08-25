// On importe mysql
const mysql = require('mysql');
// On se connecte à la DB de groupomania
const db = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});
 
db.connect();
 
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  console.log('Connexion MySQL réussie !');
});
 
module.exports = db;