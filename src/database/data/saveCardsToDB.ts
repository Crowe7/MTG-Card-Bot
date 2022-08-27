import { Card, isCard, saveCard } from "../models/Card";
import { saveCardCollection } from "../models/CardCollection";
import { saveNonValidCard } from "../models/NoScryfallListing";
import { stripAndForceLowerCase } from "../../data/convertText";
 export const saveCardsToDB = async (cards: unknown[], name: string) => {
     //set to any because setting to ObjectId[] doesnt work;

    let cardArr: any[] = [];
    if(!cards) {
        await saveNonValidCard(name);
        return;
    }

    else {

        if(isCard(cards[0])) {
            let foundCardCheck = await Card.findOne({ name: cards[0].name, set: cards[0].set}).exec();
            if(foundCardCheck) {
                return
            }
         }

        for(const card of cards) {
            if(isCard(card)) {
                await saveCard(card.name, card.set, card);
                let foundCard = await Card.findOne({ name: card.name, set: card.set}).exec();
                if(foundCard) {
                    cardArr = [...cardArr,  foundCard?._id] ;
                }
            }
        };
    }
    if(isCard(cards[0]) && cardArr.length !== 0) {
        await saveCardCollection(stripAndForceLowerCase(cards[0].name), cardArr);
    }    
}
