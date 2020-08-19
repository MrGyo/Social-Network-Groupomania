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
     db.query('SELECT * FROM `user` WHERE `username` = "Sido"', function (error, results, fields) {
        console.log("error:"); 
        console.log(error);
         if 
            (error) res.send(error);
         else
            res.send(results);
      });     
    };

// fonction signup
exports.signup = (req, res, next) => {
    const user = req.body
    console.log(user.password);
    if (user.password == "" || user.password == undefined)
    return res.send({
        message:
          'Pas de donnée !'
      });   
    // On appelle la méthode hash de bcrypt et on lui passe le mdp de l'utilisateur, le salte (10) ce sera le nombre de tours qu'on fait faire à l'algorithme
    bcrypt.hash(user.password, 10)
    // On récupère le hash de mdp qu'on va enregister en tant que nouvel utilisateur dans la BDD mysql
      .then(hash => {
        user.password = hash;
        query= "INSERT INTO users SET username='"+ user.username +"', email='" +user.email+ "', password='" + user.password + "'";
        db.query(query, function (error, results, fields){
            console.log("error:"); 
            console.log(error);
            if (error) {
                // Message d'erreur si erreur
                console.log(error) 
                return res.status(400).json(error.sqlMessage)
              } 
                // Message de création du compte
                return res.status(201).json({
                message: 'Votre compte a été corrcecement créé !'
              })
            });     
        });
    };

// fonction login
exports.login = (req, res, next) => {
    // On doit trouver l'utilisateur dans la BDD qui correspond à l'adresse entrée par l'utilisateur
    User.findOne({ email: req.body.email })
    .then(user => {
        // Si on trouve pas l'utilisateur on va renvoyer un code 401 "non autorisé"
        if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // On utilise bcrypt pour comparer les hashs et savoir si ils ont la même string d'origine
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            // Si false c'est que ce n'est pas le bon utilisateur, ou mdp incorrect
            if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // Si true on renvoie un statut 200 et un objet JSON avec un userID + un token
            res.status(200).json({
                userId: user._id,
                // Permet de vérifier si la requête est authentifiée, on va pouvoir obtenir un token encodé pour cette authentification grâce à jsonwebtoken, on va créer des tokens et les vérifier
                token: jwt.sign(
                  { userId: user._id },
                  config.secret,
                  // Argument de configuration avec une expiration au bout de 24h
                  { expiresIn: '24h' }
                )
                // On encode le userID pour la création de nouveaux objets, et permet d'appliquer le bon userID aux objets et ne pas modifier les objets des autres
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};  