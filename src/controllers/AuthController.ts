import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import User from "../models/user";
import bcrypt from 'bcrypt'

export const signin = async (req: Request, res: Response) => {
 
   const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }
  const {email,password} = req.body
  
  //validando e-mail
  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      error: { emai: { msg: "E-mail ou senha errados!" } },
    });
    return;
  }

  //validando a senha
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    res.json({
      error: { emai: { msg: "E-mail ou senha errados!" } },
    });
    return;
  }

  const payload = (Date.now() + Math.random()).toString();
  const token = await bcrypt.hash(payload, 10);

  user.token = token
  await user.save()

  res.json({token, email});
};

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }
  const data = matchedData(req);

  // verificanado se email existe
  const user = await User.findOne({
    email: data.email,
  });
  if (user) {
    res.json({
      error: { emai: { msg: "E-mail já existe!" } },
    });
    return;
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const payload = (Date.now() + Math.random()).toString();
  const token = await bcrypt.hash(payload, 10);

  const newUser = new User({
    name: data.name,
    email: data.email,
    passwordHash,
    token,
  });

  await newUser.save();
  res.json({ token });
};
