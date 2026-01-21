import mongoose from "mongoose";
import { appConfig } from "./appConfig/appConfig";

export const connectDB = async () => {
  try {
    const uri = `mongodb://${appConfig.mongoDb.host}:${appConfig.mongoDb.port}/${appConfig.mongoDb.dbName}`;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connect error", error);
    throw error;
  }
};
