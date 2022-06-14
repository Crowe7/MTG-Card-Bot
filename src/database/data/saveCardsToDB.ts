import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { Card, isCard, saveCard } from "../models/Card";
import { saveCardCollection } from "../models/CardCollection";
import { saveNonValidCard } from "../models/NoScryfallListing";

import { Types } from "mongoose"


import 'dotenv/config'
mongoose.connect(process.env.MONGO_URI as string);


 export const saveCardsToDB = async (cards: unknown[], name: string) => {
     //set to any because setting to ObjectId[] doesnt work;
    let cardArr: any[] = [];
    if(cards.length === 0 || !cards) {
        await saveNonValidCard(name);
        return;
    }
    else {
        for(const card of cards) {
            if(isCard(card)) {
                await saveCard(card.name, card.set, card);
                let foundCard = await Card.findOne({ name: card.name }).exec();
                if(foundCard) {
                    cardArr = [...cardArr,  foundCard?._id] ;
                }
            }
        };
    }
    if(isCard(cards[0]) && cardArr.length !== 0) {
        console.log(cardArr)
        await saveCardCollection(cards[0].name, cardArr);
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