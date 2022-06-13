import { ObjectId } from "mongoose";
import { Card, isCard, saveCard } from "../models/Card";
import { saveCardCollection } from "../models/CardCollection";
import { saveNonValidCard } from "../models/NoScryfallListing";


 export const saveCardsToDB = async (cards: unknown[], name: string) => {
    const cardArr: ObjectId[] = [];

    if(!cards) {
        await saveNonValidCard(name);
        return;
    }
    else {
        cards.forEach( async (card) => {
            if(isCard(card)) {
                await saveCard(card.name, card.set, card);
                let foundCard = await Card.findOne({ name: card.name }).exec();
                cardArr.push(foundCard?._id as unknown as ObjectId);
            }
        });
        if(isCard(cards[0])) {
            await saveCardCollection(cards[0].name, cardArr);
        }
    }    
}

/*

          const cardArr = []
        await saveCard(fakeCard.name, fakeCard.set, fakeCard);

        let card = await Card.findOne({ name: fakeCard.name }).exec();

        cardArr.push(card?._id as unknown as ObjectId);

        console.log(card)
        await saveCardCollection(fakeCard.name, cardArr);
*/

/*

        let card = await CardCollection.findOne({ name: fakeCard.name }).populate({path: 'sets', model: Card}).exec()
        if (isCard(card?.sets[0])) {
            console.log(card?.sets[0].details.name);
        } else {
            console.log('Not type card');
        }
*/