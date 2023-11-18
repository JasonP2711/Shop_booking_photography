const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("here hello anybody here!");
  const authorizationHeader = req.header["Authorization"];
  const token = authorizationHeader.split(" ")[1];
  console.log("token auth: ", token);
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      console.log("verify token jwt: ", data, err);
      if (err) res.sendStatus(403);
      next();
    });
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};
