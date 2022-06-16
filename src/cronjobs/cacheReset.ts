import mongoose from "mongoose";
import 'dotenv/config'
import { showCollections } from "../database/data/fetchCollections";

function isArray(val: unknown): val is unknown[] {
  return (
    Array.isArray(val)
  );
}

const mongoDB = process.env.MONGO_URI as string;
 export const cacheReset = async () => {

  //const collections: unknown  = [{name: 'cards'}];

  mongoose 
 .connect(process.env.MONGO_URI as string, {})   
 .then(() => console.log("Cron Database connected!"))
 .catch(err => console.log(err));

 const conn = mongoose.connection;

 // for each of the 3 seperate caches we want to clear we check for them and then drop them
 // those are Card CardCollection and NoScryFallListing
   
  // remove any in refactor
    conn.on('open', async () => {
      const collections: unknown  = await showCollections(conn);
      if(collections && isArray(collections)) {
        collections.forEach( async (element: any) => {
          if(element.name === "cards" || element.name === "card printings" || element.name === "non-valid cards") {
            conn.db.dropCollection(element.name, (err, result) =>{
              console.log(result, err);
              console.log(`Dropped collection ${element.name}`);
            })
          }
        });
      }
      // this is to make sure it waits till collection is dropped
      setTimeout(() => {conn.close()}, 10000);
    });
}

cacheReset();