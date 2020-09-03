const db = require('../mysqlConfig');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.createTopic = (req, res, next) => {
  let topic = req.body
  let query = "";
  console.log(topic);
  if (topic.id_parent == "")
    query= "INSERT INTO topic SET title='" + topic.title.addSlashes() + "', message='" + topic.message.addSlashes() + "', user_id= '" + topic.user_id + "'";
  else
    query= "INSERT INTO topic SET title='" + topic.title.addSlashes() + "', message='" + topic.message.addSlashes() + "', user_id= '" + topic.user_id + "', id_parent= '" + topic.id_parent + "'";
  db.query(query, function (error, results, fields) {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    return res.status(201).json({ message: 'Your message has been sent !' })
  });
};

exports.modifyMessage = (req, res, next) => {
  let query = 'SELECT * FROM topic WHERE id=?'
  db.query(query, req.params.id, function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }

      let token = req.headers.authorization.split(' ')[1];
      let decodedToken = jwt.verify(token, config.secret);
      let userId = decodedToken.userId;
      let role = decodedToken.role;
      let messageUserId = results[0].user_id;
      //console.log(decodedToken);
      if (userId !== messageUserId && role !== 'admin') {
        return res.status(401).json({ message: 'Access denied !' })
      }

      let updatedMessage = req.body;
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
  let query = `SELECT * FROM topic WHERE id=${req.params.id}`
  db.query(query, function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      };

      let token = req.headers.authorization.split(' ')[1];
      let decodedToken = jwt.verify(token, config.secret);
      let userId = decodedToken.userId;
      let role = decodedToken.role;
      let messageUserId = results[0].user_id;

      if (userId !== messageUserId && role !== 'admin') {
        return res.status(401).json({ message: 'Access denied !' })
      };
      let query2 = `DELETE FROM topic WHERE id=${req.params.id} OR id_parent=${req.params.id} `;
      db.query(query2, function (error, results, fields) {
          if (error) {
            return res.status(400).json(error)
          }
          return res
            .status(200)
            .json({ message: 'Your thread has been deleted !' })
        }
      );
    }
  );
};