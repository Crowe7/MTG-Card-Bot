import { Attachment } from "discord.js";
import { attachmentHandler } from "./attachmentHandler";
import { stripAndForceLowerCase } from "./convertText";

interface CardToRemoveInterface {
    name: string,
    quantity: number,
    set: string
}

export const bulkCardParse = async (cardAttachmentData: Attachment): Promise<CardToRemoveInterface[]> => {

    let cardInfoArr:CardToRemoveInterface[] = [];
    
    let bulkTextDataArray = await attachmentHandler(cardAttachmentData)
    
    for (let card of bulkTextDataArray) {

        let cardInfo: CardToRemoveInterface = {
            name: '',
            quantity: 0,
            set: ''
        };

        let splitCard = card.split(' ');
        // if the card provided has a specific set it removes the brackets before adding it to the object

        cardInfo.quantity = parseInt(splitCard[0])

        if( splitCard[splitCard.length - 1].charAt(0) === "[" || splitCard[splitCard.length - 1].charAt(0) === "(" ) {
            let setcode = stripAndForceLowerCase( splitCard[splitCard.length - 1]);
            cardInfo.set = setcode;
        }

        let cardNameArray = splitCard.slice(1, splitCard.length - 1);

        cardInfo.name = cardNameArray.join(' ');

       cardInfoArr = [...cardInfoArr, cardInfo]
    };

    return cardInfoArr

}