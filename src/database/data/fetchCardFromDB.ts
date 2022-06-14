// when fetching a card from the db, maybe check if setname is being usedm if not just use that name to search the Card collection
// if setname is being query the actual CardCollection to check for the cards specific name
    // then check each card inside and see if the set matches
    // if you find a match return that card info
import 'dotenv/config'
import mongoose from "mongoose";
import { matchName } from '../../data/matchNameRegex';
import { Card, isCard } from "../models/Card";
import { CardCollection } from '../models/CardCollection';
import { NoCard } from '../models/NoScryfallListing';

    // if no match just return the first card in the array itself.
    /*
    mongoose 
        .connect(process.env.MONGO_URI as string, {})   
        .then(() => console.log("Cron Database connected!"))
        .catch(err => console.log(err));
   
    const conn = mongoose.connection;
    conn.on('open', async () => {
        console.log(await Card.findOne({ name: 'awdawd' }).exec())
    })
    */


 export const fetchCardFromDB = async (name:string, setName:string | null) => {
    const card = await CardCollection.findOne({ name: {$regex: matchName(name), $options: 'i'} }).populate({path: 'sets', model: Card}).exec()
    //check if this finds a card in the card collection
    if(card) {
        if(!setName) {
            // returns the first card if no set matches.
            return card.sets[0];
        }
        if (isCard(card.sets[0])) {
            for(const printing of card.sets) {
                if(printing.set === setName) {
                    return printing
                }
            };
            return card.sets[0];
        }
        // if it doesnt then we return null
    } else {
        return null
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


/*
            cardModel.findOne({ "name": { $regex: regexVariable} }, 
                (err, card) => {
                    if (err) return handleErr(err);
                    if (!setName) {
                        return card.printing[0]
                    }
                    let correctCardPrinting = card.printing.filter(printing => printing.set === setName);

                    if(!correctCardPrinting) {
                        return card.printing[0];
                    }
                    return correctCardPrinting;
                }
            )
            cardNonExistanceModel.findOne({ "name": { $regex: regexVariable} }, 
                (err, card) => {
                    if (err) return handleErr(err);
                    return card;
                }
            )
*/

// https://stackoverflow.com/questions/26818071/mongoose-schema-hasnt-been-registered-for-model