const db = require('../mysqlConfig');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.createTopic = (req, res, next) => {
  const topic = req.body
  console.log(topic);
  let query= "INSERT INTO topic SET title='" + topic.title.addSlashes() + "', message='" + topic.message.addSlashes() + "', user_id= '" + topic.user_id + "'";
  db.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    return res.status(201).json({ message: 'Your topic is created !' })
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
        return res.status(401).json({ message: 'Access denied !' })
      }
      const updatedMessage = req.body;
      db.query('UPDATE topic SET ? WHERE id=?', [updatedMessage, req.params.id], function (error, results, fields) {
          if (error) {
            return res.status(400).json(error)
          }
          return res
            .status(200)
            .json({ message: 'Your message has been modified !' })
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
    return res.status(201).json({ message: 'Your message has been sent !' })
  });
};


exports.getAllTopics = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.userId;
  let query = "SELECT * from user INNER JOIN topic ON user.id = topic.user_id ORDER BY creation_date DESC";
  db.query(query, [userId], function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json({ results })
    }
  );
};

exports.deleteMessage = (req, res, next) => {
  let query = 'SELECT * FROM topic WHERE id=?'
  db.query(query, req.params.id, function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      };
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, config.secret);
      const userId = decodedToken.userId;
      const role = decodedToken.role;
      const messageId = results[0].idUSERS;
      if (userId !== messageId && role !== 'admin') {
        return res.status(401).json({ message: 'Access denied !' })
      };
      db.query(
        `DELETE FROM topic WHERE id=${req.params.id}`,
        req.params.id,
        function (error, results, fields) {
          if (error) {
            return res.status(400).json(error)
          }
          return res
            .status(200)
            .json({ message: 'Your message has been deleted !' })
        }
      );
    }
  );
};

exports.addLike = (req, res, next) => {
  const like = req.body;
  let query = 'INSERT INTO like SET ?';
  db.query(query, like, function (error, results, fields) {
    if (error) {
      return res.status(400).json(error)
    };
    return res.status(201).json({ message: 'Votre like a bien été ajouté !' })
  });
};

exports.removeLike = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.userId;
  db.query(`DELETE FROM like WHERE id=${req.params.id} && id=${userId}`, function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      };
      return res
        .status(200)
        .json({ message: 'Votre like a bien été supprimé !' })
    }
  );
};