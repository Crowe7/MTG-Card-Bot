import mongoose, { ObjectId } from "mongoose";
import 'dotenv/config'
import { showCollections } from "../database/data/fetchCollections";
import { CollectionInfo } from "mongodb";
import { saveNonValidCard } from "../database/models/NoScryfallListing";
import { saveCard, Card, isCard, } from "../database/models/Card";
import { CardCollection, saveCardCollection } from "../database/models/CardCollection";

const mongoDB = process.env.MONGO_URI as string;

mongoose 
 .connect(process.env.MONGO_URI as string, {})   
 .then(() => console.log("Cron Database connected!"))
 .catch(err => console.log(err));

 const conn = mongoose.connection



    
      conn.on('open',  async () => {
        const collections: unknown = await showCollections();

        console.log(collections);
        conn.close();
    });
