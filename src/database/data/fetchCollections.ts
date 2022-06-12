import mongoose from "mongoose";
import 'dotenv/config'
import { CollectionInfo } from "mongodb";

const mongoDB = process.env.MONGO_URI as string;

export const showCollections = async () => {
    mongoose 
        .connect(process.env.MONGO_URI as string, {})   
        .then(() => console.log(" Collections Database connected!"))
        .catch(err => console.log(err));

    const conn = mongoose.connection;

    return new Promise(res => {
        conn.on('open', () => {
            conn.db.listCollections().toArray((err, collections) => {
                if (err) console.log(err);
                conn.close();
                res(collections);
            });
        });
    });
}


