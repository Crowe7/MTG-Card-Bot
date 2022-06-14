import fetch from 'node-fetch';
// When we fetch the card from the api we need to save all the cards we find
// for each we save put those into a seperate array
// use that array and use that to save the Card collection model 

// so we save the card into the db as a card. then take the id of that same card and push that to an array
// using that array to populate the CardCollection
export const fetchCardAPI = async (name: string) => {
   // console.log(name);
    const cardMatches = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${name}`)
        .then(response => response.json());
   // console.log(cardMatches);

    const firstCardMatch:string = cardMatches.data[0];

    const query = new URLSearchParams(firstCardMatch);

    const cards = await fetch(`https://api.scryfall.com/cards/search?as=grid&order=released&q=%21"${query}"+include%3Aextras&unique=prints`)
        .then(res => res.json());

    return(cards.data);

}

// fetchCardAPI('Opt');