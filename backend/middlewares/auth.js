import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(403).json({
      msg: "You dont have the authorization.",
      err : authHeader
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.documentId = decoded.documentId;
    req.username = decoded.username;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({});
  }
}
