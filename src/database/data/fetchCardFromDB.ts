// when fetching a card from the db, maybe check if setname is being usedm if not just use that name to search the Card collection
// if setname is being query the actual CardCollection to check for the cards specific name
    // then check each card inside and see if the set matches
    // if you find a match return that card info
import 'dotenv/config'
import mongoose from "mongoose";
import { matchName } from '../../data/matchNameRegex';
import { Card, isCard } from "../models/Card";
import { CardCollection } from '../models/CardCollection';

    // if no match just return the first card in the array itself.


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

// https://stackoverflow.com/questions/26818071/mongoose-schema-hasnt-been-registered-for-model