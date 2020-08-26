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
    const userReq = req.body.username;
    const passReq = req.body.password;
    if (userReq && passReq) {
        db.query("SELECT * FROM user WHERE username= ?",
        userReq,
        function (_error, results, _fields) {
            if (results.length > 0) {
            bcrypt.compare(passReq, results[0].password).then((valid) => {
                if (!valid) {
                res
                    .status(401)
                    .json({ message: 'Utilisateur ou mot de passe inconnu' })
                } else {
                console.log(userReq, "est connecté au salon")
                let privilege = ''
                if (results[0].isAdmin === 1) {
                    privilege = 'admin'
                } else {
                    privilege = 'user'
                }
                res.status(200).json({
                    userId: results[0].idUSERS,
                    username: results[0].username,
                    email: results[0].email,
                    privilege: privilege,
                    accessToken: jwt.sign(
                    { userId: results[0].idUSERS, role: privilege },
                    config.secret,
                    { expiresIn: '24h' }
                    )
                })
                }
            })
            } else {
            res
                .status(401)
                .json({ message: 'Utilisateur ou mot de passe inconnu' })
            }
        }
        )
    } else {
        res
        .status(500)
        .json({ message: "Entrez un nom d'utilisateur et un mot de passe" })
    }
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