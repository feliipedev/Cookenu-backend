import User from "../models/user";
import { Request, Response, NextFunction } from "express";

export const privado = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.token) {
    res.json({ notallowed: true });
    return;
  }
  let token: string = "";

  if (req.headers.token) {
    token = req.headers.token as string;
  }
  if (token == "") {
    res.json({ notallowed: true });
    return;
  }
  const user = await User.find({
    token,
  });
  console.log(user);
  if (!user) {
    res.json({ notallowed: true });
    return;
  }
  next();
};
