import { Schema, model, connection } from "mongoose";

type UserType = {
    name: string,
    email: string,
    token: string,
    passwordHash: string,
};

const schema = new Schema<UserType>({
    name: String,
    email: String,
    token: String,
    passwordHash: String,
});

const modelName: string = "Users";

export default connection && connection.models[modelName]
  ? connection.models[modelName]
  : model<UserType>(modelName, schema);