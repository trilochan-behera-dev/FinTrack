const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const bearertoken = req.headers["authorization"];
  // Check if the token is present
  if (!bearertoken) {
    return res.status(401).json({ message: "No token provided" });
  }
  let token;
  
  if (bearertoken.includes("Bearer")) {
    token = bearertoken.split(" ")[1];
  } else {
    token = bearertoken;
  }
  
  // Verify and decode the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(404).json({ message: "Invalid token" });
    }
    // Attach the user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware
    next();
  });
};

module.exports = verifyToken;
