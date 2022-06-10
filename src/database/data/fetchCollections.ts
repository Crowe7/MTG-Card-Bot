import mongoose from "mongoose";
import 'dotenv/config'
import { CollectionInfo } from "mongodb";

const mongoDB = process.env.MONGO_URI as string;

const conn = mongoose.createConnection(mongoDB);

export const showCollections = () => {
    let collectionNames: (CollectionInfo | Pick<CollectionInfo, "name" | "type">)[] | null | undefined = null
    
    conn.on('open', () => {
        conn.db.listCollections().toArray( (err, collections) => {
            if (err) console.log(err);
            collectionNames = collections
            conn.close();
        });
    });

    return collectionNames
}
