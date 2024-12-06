import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    console.log("No authorization header found");
    const error = new Error("No Autorizado");
    return res.status(401).json({ error: error.message });
  }
  const token = bearer.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select("_id email name");
      if (!user) {
        const error = new Error("Token no válido");
        return res.status(401).json({ error: error.message });
      } else {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    return res.status(500).json({ error: "Token No Valido" });
  }
};
