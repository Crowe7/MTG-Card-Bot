import mongoose from "mongoose";
import 'dotenv/config'

let mongoDB = process.env.MONGO_URI as string;

export const connectToDB = async () => {
    await mongoose.connect(mongoDB);
}
