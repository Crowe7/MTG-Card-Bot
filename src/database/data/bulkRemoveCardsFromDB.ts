import { Attachment } from "discord.js";
import { attachmentHandler } from "../../data/attachmentHandler";
import { stripAndForceLowerCase } from "../../data/convertText";
import { viewFullUserCollectionDB } from "./viewFullUserCollectionDB";

interface CardToRemoveInterface {
    name: string,
    quantity: number,
    set: string
}

export const bulkRemoveFromDB = async (discordId: string, bulkData?: Attachment) => {


    if(!bulkData) {
        throw new Error('No cards provided to remove!');
    }
    
    let bulkTextDataArray = await attachmentHandler(bulkData)
    
    for (let card of bulkTextDataArray) {

        let cardInfo: CardToRemoveInterface = {
            name: '',
            quantity: 0,
            set: ''
        };

        let splitCard = card.split(' ');
        // if the card provided has a specific set it removes the brackets before adding it to the object

        cardInfo.quantity = parseInt(splitCard[0])

        if( splitCard[splitCard.length - 1].charAt(0) === "[" || splitCard[splitCard.length - 1].charAt(0) === "(") {
            let setcode = stripAndForceLowerCase( splitCard[splitCard.length - 1]);
            cardInfo.set = setcode;
        }

        let cardNameArray = splitCard.slice(1, splitCard.length - 1);
        // console.log(cardNameArray.join(''));
        console.log(cardInfo)
    };

    let collection = await viewFullUserCollectionDB(discordId);

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