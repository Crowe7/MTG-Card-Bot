import { matchName } from "../../data/matchNameRegex";
import { NoCard } from "../models/NoScryfallListing";

export const CheckMissingDB = async (name: string) => {
    const cardName = await NoCard.findOne({ name: {$regex: matchName(name)} }).exec();

    if(cardName) {
        return name
    }
    
    return null;
}