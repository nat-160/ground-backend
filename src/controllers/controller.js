// Example controllers/userController.js
const Users = require("../models/users");
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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add more controller functions as needed
