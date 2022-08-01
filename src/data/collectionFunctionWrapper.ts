import { bulkAddToDb } from "../database/data/bulkAddCardsToDB";
import { bulkRemoveFromDB } from "../database/data/bulkRemoveCardsFromDB";
import { deleteFullCollection } from "../database/data/deleteFullcollection";
import { viewFullCollection } from "../database/data/viewFullCollection";
import { convertToTXT } from "./convertTextToTXT";

export const collectionFunction = async (functionName: string, discordID: string, bulkData?: string | null ) => {
    /*
        after each function call convert the object that they return into a txt file unless they throw an error

    */
    switch (functionName) {
        case 'add':
            return bulkAddToDb(discordID, bulkData);
        case 'remove':
            return bulkRemoveFromDB(discordID, bulkData);
        case 'view':
            return  convertToTXT(await viewFullCollection(discordID));
        case 'deleteCollection':
            return await deleteFullCollection(discordID);
        default:
            return 'INVALID COMMAND NAME'
    }
}