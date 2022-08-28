import { Attachment } from "discord.js";
import { bulkCardParse } from "../../data/bulkCardParser";
import { stripAndForceLowerCase } from "../../data/convertText";
import { convertToTXT } from "../../data/convertTextToTXT";
import { CheckMissingDB } from "./checkMissingDB";
import { fetchExactCardAPR } from "./fetchCard";
import { fetchCardFromDB } from "./fetchCardFromDB";
import { saveCardToCollectionDb } from "./saveCardToCollectionDB";

export const bulkAddToDb = async (discordID: string, bulkData?: Attachment, userName?: string) => {

    // this is gross :(
    convertToTXT('NO CARDS ADDED!');

    if(!bulkData) {
        throw new Error('No cards provided to add!');
    }
    if(!userName) {
        throw new Error('No userName provided!');
    }

    const bulkDataArr = await bulkCardParse(bulkData);

    const fetchCardToAdd = async (cardName: string, setName: string) => {
        cardName = stripAndForceLowerCase(cardName);
        setName = stripAndForceLowerCase(setName);

        let card: any = await fetchCardFromDB(cardName, setName);
        // checks if the card is in DB
        if(!card) {
            let noCard = await CheckMissingDB(cardName);
            if(noCard) {
                throw new Error
            } else {
                card = await fetchExactCardAPR(cardName, setName);
                if(!card) {
                    throw new Error
                }
            }
        }
        // returns a card if present... will be null if nothing there
        return card
    }

    let succAdded:string[] = ['CARDS ADDED SUCCESSFULLY! \n'];
    let failAdded:string[] = ['\n\nCARD FAILED TO BE ADDED! \n'];


    for (let cardInfo of bulkDataArr) {
        try {
            let card = await fetchCardToAdd(cardInfo.name, cardInfo.set);
            await saveCardToCollectionDb(card.name, userName, card.set, discordID, cardInfo.quantity);
            succAdded = [...succAdded, cardInfo.name + '\n'];
        } catch(err) {
            failAdded = [...failAdded, cardInfo.name + '\n'];
        }
    }

    let removedText = [...succAdded, ...failAdded].join('')
    convertToTXT(removedText);

    // takes bulk data from interaction and then 
    /*
        loops through each card provided then adds that card to the db.
            saves card to cache db at the same time preferabley. this has to check with the api or db for each card
        checks if the card exists if not then add a new card to the user
        add to the quantity based on the number in from of the card.

        returns an object with each card that was added.
    */
}