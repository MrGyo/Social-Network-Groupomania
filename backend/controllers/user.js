// On retrouve ici la logique métier en lien avec nos utilisateurs

// On utilise bcrypt pour hasher le MDP des utilisateurs
const bcrypt = require('bcrypt');
// On utilise jsonwebtoken pour attribuer un token à l'utilisateur au moment de la connexion
const jwt = require('jsonwebtoken');
// On récupère la clef pour le TOKEN
const config = require('../config/auth.config');
// On importe la base de données MySQL
const db = require('../mysqlConfig');

// Test connexion MySQL avec une route test simple
exports.test = (req, res) => {
     db.query('SELECT * FROM `user` WHERE `username` = "Alex"', function (error, results, fields) {
        console.log("error:"); 
        console.log(error);
        if (error) res.send(error);
        else res.send(results);
    });     
};

// fonction signup
exports.signup = (req, res, next) => {
    const user = req.body;
    console.log("user data:");
    console.log(user);
    if (user.password == "" || user.password == undefined)
        return res.status(200).json({message:'Pas de données !'});   
    bcrypt.hash(user.password, 10)
        .then(hash => {
        user.password = hash;
        query= "INSERT INTO user SET username='"+ user.username +"', email='" +user.email+ "', password='" + user.password + "'";
        db.query(query, function (error, results, fields){
            console.log("error sql:"); 
            console.log(error);
            if (error) {
                console.log(error);
                return res.status(400).json(error.sqlMessage);
            } 
                return res.status(201).json({message: 'Création du compte avec succès :) !'});
            });     
        });
};

// fonction login
exports.login = (req, res, next) => {
    let user = req.body.username;
    let password = req.body.password;
    if (!user || !password)
       return res.status(500).json({ message: "Entrez un nom d'utilisateur et un mot de passe" });
    let query = "SELECT * FROM user WHERE username='" + user + "'";

    db.query(query, function (error, results, fields) {
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password).then((valid) => {
                if (valid) 
                {
                    console.log(user, "est connecté au salon")
                    console.log(results[0]);
                    return res.status(200).json({
                        userId: results[0].id,
                        username: results[0].username,
                        email: results[0].email,
                        userRight: results[0].user_right,
                        token: jwt.sign(
                        { userId: results[0].id, role: results[0].user_right },
                        config.secret,
                        { expiresIn: '24h' }
                        )
                    });
                }
                else{
                    console.log("Erreur log/pass!")
                    return res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu'});
                }
            });
        } 
        else{
            console.log("Erreur log/pass!")
            return res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu'});
        }
            
    })
};

exports.getAllUsers = (req, res, next) => {
    db.query("SELECT idUSERS, username, isAdmin, bio, email FROM groupomania.users",
      function (error, results, fields) {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json({ results })
      }
    )
  };
  
exports.deleteUser = (req, res, next) => {
db.query(`DELETE FROM user WHERE idUSERS=${req.params.id}`,
    req.params.id,
    function (error, results, fields) {
    if (error) {
        return res.status(400).json(error)
    }
    return res
        .status(200)
        .json({ message: 'Votre compte a bien été supprimé !' })
    })
};