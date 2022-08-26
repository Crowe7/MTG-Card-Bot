import { Attachment } from "discord.js";
import { bulkAddToDb } from "../database/data/bulkAddCardsToDB";
import { bulkRemoveFromDB } from "../database/data/bulkRemoveCardsFromDB";
import { deleteFullCollection } from "../database/data/deleteFullcollection";
import { convertToTXT } from "./convertTextToTXT";
import { viewFullCollection } from "./viewFullCollection";

enum collectionFunctions {
    add = 'add',
    remove = 'remove',
    view = 'view',
    deleteCollection = 'deleteCollection'
}

export const collectionFunction = async (functionName: collectionFunctions | string, discordID: string, bulkData?: Attachment ) => {
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