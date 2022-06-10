import mongoose from "mongoose";
import 'dotenv/config'
import { showCollections } from "../database/data/fetchCollections";
import { CollectionInfo } from "mongodb";

const mongoDB = process.env.MONGO_URI as string;

const collections: (CollectionInfo | Pick<CollectionInfo, "name" | "type">)[] | null | undefined = showCollections();

const conn = mongoose.createConnection(mongoDB);


    
    conn.on('open', () => {
        // ifs for each collection and drop what we find.
        conn.close();
    });

