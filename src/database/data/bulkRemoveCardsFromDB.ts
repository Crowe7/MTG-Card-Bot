import { Attachment } from "discord.js";
import { viewFullUserCollectionDB } from "./viewFullUserCollectionDB";

export const bulkRemoveFromDB = async (discordId: string, bulkData?: Attachment) => {

    if(!bulkData) {
        throw new Error('No cards provided to remove!');
    }
    
    console.log(bulkData)

    let collection = await viewFullUserCollectionDB(discordId);
    // console.log(collection);

    return  'NOT IMPLEMENTED YET'
    // takes bulk data from interaction and then 
    /*
        loops through each card provided then removes that card quantity from the db.
            check user for each card and remove if quantity goes below the number
        remove to the quantity based on the number in from of the card.

        returns an object with each card that was removed. 
            put quantity for each card if it didnt get completly removed
                if it did get completly removed just put that the card was removed
    */
}


/*

    Parse each string with quantity name then set
    for each one pass it into remove card from database


    put a try catch in a for loop
    and set a variable for removed and one for not removed
    when remove copy throws update cannotRemove variable with the current card from the loop,
    

*/