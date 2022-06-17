import { stripAndForceLowerCase } from "../../data/convertText";

export const fetchCardAPI = async (name: string) => {
    const cardMatches = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${name}`)
        .then(response => response.json());

    const firstCardMatch:string = stripAndForceLowerCase(cardMatches.data[0]);
    console.log(firstCardMatch);

    const cards = await fetch(`https://api.scryfall.com/cards/search?q=+not%3Adigital+%21${firstCardMatch}&unique=prints&as=grid&order=released`)
        .then(res => res.json());
    return(cards.data)

}
