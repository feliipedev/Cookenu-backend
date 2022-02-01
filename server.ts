import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const server = express();
console.log('vraun')
server.use(express.static(path.join(__dirname, "../public")));