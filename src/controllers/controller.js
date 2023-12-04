// Example controllers/userController.js
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");

exports.default = async (_, res) => {
  res.json({ message: "backend api!" });
};

exports.newMessage = async (req, res) => {
  try {
    const { username, message } = req.query;
    const query = `
      INSERT INTO messages (username, message)
      VALUES (:username, :message)
    `;

    await sequelize.query(query, {
      replacements: { username, message },
      type: QueryTypes.INSERT,
    });
    res.json({ message: "message sent!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getUserMessages = async (req, res) => {
  try {
    const username = req.params.username;
    const messages = await sequelize.query(
      "SELECT messages.* FROM messages WHERE messages.username = :username",
      {
        replacements: { username },
        type: QueryTypes.SELECT,
      }
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getUserPage = async (req, res) => {
  try {
    const { username } = req.query;
    const query = `
    SELECT messages.*
    FROM messages
    JOIN users ON messages.username = users.username
    JOIN connections ON users.username = connections.followingName
    WHERE connections.followerName = :username;`;
    const messages = await sequelize.query(query, {
      replacements: { username },
      type: QueryTypes.SELECT,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.follow = async (req, res) => {
  try {
    const { followerName, followingName } = req.query;
    const query = `
    INSERT INTO connections (followerName, followingName)
    VALUES (:followerName, :followingName);
    `;
    await sequelize.query(query, {
      replacements: { followerName, followingName },
      type: QueryTypes.INSERT,
    });
    res.json({ message: followerName + " followed " + followingName });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const { followerName, followingName } = req.query;
    const query = `
    DELETE FROM connections
    WHERE followerName = :followerName AND followingName = :followingName;
    `;
    await sequelize.query(query, {
      replacements: { followerName, followingName },
      type: QueryTypes.DELETE,
    });
    res.json({ message: followerName + " unfollowed " + followingName });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, userpassword } = req.query;
    const query = `
    INSERT INTO users (username, userpassword)
    VALUES (:username, :userpassword);
    `;
    await sequelize.query(query, {
      replacements: { username, userpassword },
      type: QueryTypes.INSERT,
    });
    res.json({ message: "Registered user " + username });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
// Add more controller functions as needed
