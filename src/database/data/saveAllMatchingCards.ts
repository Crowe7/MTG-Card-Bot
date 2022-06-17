import { stripAndForceLowerCase } from "../../data/convertText";
import { fetchCardAPI } from "./fetchCard";
import { fetchCardFromDB } from "./fetchCardFromDB";
import { saveCardsToDB } from "./saveCardsToDB";

export const saveAllMatchingCards = async (name: string) => {
    const cardMatches = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${name}`)
        .then(response => response.json());

    for(const cardName of cardMatches.data) {
        const cardMatch:string = stripAndForceLowerCase(cardName);
        if(!await fetchCardFromDB(cardMatch, null) ) {
            const cards = await fetchCardAPI(cardMatch)

            await saveCardsToDB(cards, cardMatch);
        }
    }
}
