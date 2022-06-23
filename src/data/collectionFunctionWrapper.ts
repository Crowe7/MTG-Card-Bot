import { bulkAddToDb } from "../database/data/bulkAddCardsToDB";
import { bulkRemoveFromDB } from "../database/data/bulkRemoveCardsFromDB";
import { viewFullCollection } from "../database/data/viewFullCollection";

export const collectionFunction = (functionName: string, /*data: string */) => {
    switch (functionName) {
        case 'add':
            return bulkAddToDb();
        case 'remove':
            return bulkRemoveFromDB();
        case 'view':
            return viewFullCollection();
        default:
            return 'INVALID COMMAND'
    }
}