import { Request, Response } from "express";
import mongoose from "mongoose";
import Recipe from "../models/recipe";
import User from "../models/user";
import sharp from "sharp";

interface MulterRequest extends Request {
  file?: any;
}

export const feed = async (req: Request, res: Response) => {
  const recipes: any = await Recipe.find();
  const data: any = [];
  for (let i in recipes) {
    data.push({
      id: recipes[i].id,
      title: recipes[i].title,
      image: recipes[i].image,
    });
  }
  return res.json(data);
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.json({ error: "Sem receita" });
    return;
  }

  const recipe = await Recipe.find({ id });

  if (!recipe) {
    res.json({ error: "Receita não encontrada" });
    return;
  }

  return res.json(recipe);
};

export const addRecipe = async (
  req: MulterRequest,
  res: Response
): Promise<any> => {
  let { title, description, token } = req.body;
  const recipe = await Recipe.find();
  const user = await User.findOne({ token }).exec();

  if (!title && !description) {
    res.json({
      error: "Titulo e/ou Descrição e/ou Imagem não foram preenchidos",
    });
    return;
  }

  if (!req.file) {
    res.status(400);
    res.json({ error: "Arquivo inválido" });
    return;
  }

  await sharp(req.file.path)
    .resize(300, 300)
    .toFormat("jpg")
    .toFile(`./public/images/${req.file.filename}.jpg`);

    let nome = user?.name
  const newRecipe = new Recipe();
  newRecipe.id = recipe.length + 1;
  newRecipe.title = title;
  newRecipe.description = description;
  newRecipe.createdAt = new Date();
  newRecipe.userName = nome;
  newRecipe.userId = newRecipe._id;
  newRecipe.image = `${process.env.BASE}/images/${req.file.filename}.jpg`;

  const info = await newRecipe.save();
  res.json({ id: info._id });
};
