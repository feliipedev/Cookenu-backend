import { Schema, model, connection } from "mongoose";

type UserType = {
  id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  userName: string;
};

const schema = new Schema<UserType>({
  id: String,
  title: String,
  image: String,
  description: String,
  createdAt: String,
  userName: String,
});

const modelName: string = "recipe";

export default connection && connection.models[modelName]
  ? connection.models[modelName]
  : model<UserType>(modelName, schema);
