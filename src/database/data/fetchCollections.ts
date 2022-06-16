import mongoose from "mongoose";
import 'dotenv/config'

const mongoDB = process.env.MONGO_URI as string;

export const showCollections = (connection: mongoose.Connection) => {

    const conn = connection;

    return new Promise(res => {
            conn.db.listCollections().toArray((err, collections) => {
                if (err) console.log(err);
                res(collections);
            });
    })
}



