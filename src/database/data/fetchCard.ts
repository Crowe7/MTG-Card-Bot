import { stripAndForceLowerCase } from "../../data/convertText";

export const fetchCardAPI = async (name: string) => {
    const cardMatches = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${name}`)
        .then(response => response.json());

    if(!cardMatches.data[0]) {
        return null
    }

    const firstCardMatch:string = stripAndForceLowerCase(cardMatches.data[0]);


    const cards = await fetch(`https://api.scryfall.com/cards/search?q=+not%3Adigital+%21${firstCardMatch}&unique=prints&as=grid&order=released`)
        .then(res => res.json());
    return(cards.data)

}

export const fetchExactCardAPR = async (name: string, setName: string) => {
    const card = await fetch(`https://api.scryfall.com/cards/named?exact=${name}&set=${setName}`)
    .then(response => response.json());

    return card
}