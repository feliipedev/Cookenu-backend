import { Router } from "express";
import { Request, Response } from "express";
import * as UserController from "../controllers/UserController";
import * as AuthController from "../controllers/AuthController";
import * as AuthValidator from "../validators/AuthValidator";
import * as Auth from "../middlewares/Auth";
import multer from "multer";
import { listeners } from "process";

const upload = multer({
  dest: "./tmp",
  fileFilter: (req, file, cb) => {
    const allowed: string[] = ["image/jpg", "image/jpeg", "image/png"];
    cb(null, allowed.includes(file.mimetype));
  },
  limits: { fieldSize: 5000000 },
});

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

router.get("/recipe/feed", Auth.privado, UserController.feed);

router.post("/user/login", AuthValidator.signin, AuthController.signin);
router.post("/user/signup", AuthValidator.signup, AuthController.signup);

router.get("/recipe/:id", Auth.privado, UserController.getRecipe);

router.post("/recipe", upload.single("img"), UserController.addRecipe);

export default router;
