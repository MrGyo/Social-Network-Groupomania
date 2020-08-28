const db = require('../mysqlConfig');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.createMessage = (req, res, next) => {
  const topic = req.body
  let query= "INSERT INTO topic SET title='" + topic.title + "', message='" + topic.message + "'";
  db.query(query, message, function (error, results, fields) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json({ message: 'Votre message a bien été posté !' })
  });
};

exports.modifyMessage = (req, res, next) => {
  let query = 'SELECT * FROM topic WHERE id=?'
  db.query(query, req.params.id, function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, config.secret);
      const userId = decodedToken.userId;
      const role = decodedToken.role;
      const messageId = results[0].id;
      if (userId !== messageId && role !== 'admin') {
        return res.status(401).json({ message: 'Accès non autorisé' })
      }
      const updatedMessage = req.body;
      db.query('UPDATE message SET ? WHERE id=?', [updatedMessage, req.params.id], function (error, results, fields) {
          if (error) {
            return res.status(400).json(error)
          }
          return res
            .status(200)
            .json({ message: 'Votre message a bien été modifié !' })
        }
      );
    }
  );
};

exports.replyMessage = (req, res, next) => {
  const message = req.body;
  let query = 'INSERT INTO messages SET ?';
  db.query(query, message, function (error, results, fields) {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json({ message: 'Votre réponse a bien été postée !' })
  });
};


/*exports.getAllMessages = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.userId;
  let query = "SELECT * from user INNER JOIN topic ON user.id = topic.user_id";
  db.query(query, [userId], function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json({ results })
    }
  );
};*/

exports.getAllMessages2 = (req, res, next) => {
  let query = "SELECT * from user INNER JOIN topic ON user.id = topic.user_id";
  db.query(query, function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json({ results })
    }
  );
};
