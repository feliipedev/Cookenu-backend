import express from "express";
import dotenv from "dotenv";
import path from "path";
import { Request, Response } from "express";
import mainRoutes from "./routes/index";
import cors from "cors";
import { mongoConnect } from "./database/mongo";
dotenv.config();

mongoConnect();

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, "../public")));

server.use(mainRoutes);

server.use((req: Request, res: Response) => {
  res.render("pages/404");
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`- RODANDO NO ENDEREÇO: ${process.env.BASE}`);
});
