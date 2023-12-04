const { QueryTypes } = require("sequelize");
const sequelize = require("../config/database");
const jwt = require("jsonwebtoken");

function pullUsername(req) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "secretkey-edwin");
  return decodedToken.username;
}

exports.login = async (req, res) => {
  const username = req.params.username;
  const token = jwt.sign({ username: username }, "secretkey-edwin");
  res.json({ success: true, token });
};

exports.home = async (req, res) => {
  try {
    const username = pullUsername(req);
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

exports.newMessage = async (req, res) => {
  try {
    const username = pullUsername(req);
    const { message } = req.query;
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
// Add more controller functions as needed
