
import pkg from 'mongoose';
const { Schema, model, connection } = pkg;

type UserType = {
  _id: string;
  id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  userName: string;
  userId: string;
};

const schema = new Schema<UserType>({
  _id: String,
  id: String,
  title: String,
  image: String,
  description: String,
  createdAt: String,
  userName: String,
  userId: String,
});

const modelName: string = "recipe";

export default connection && connection.models[modelName]
  ? connection.models[modelName]
  : model<UserType>(modelName, schema);
