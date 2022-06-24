import { User, UserCardInterface } from "../models/UserCollection";

export const viewFullCollection = async (discordID: string) => {
    const currentUser = await User.findOne({discordID: discordID}).exec();
    let cards: string[] = [];

    if(!currentUser) {
        return 'No collection found... Try Adding some cards first with /cardinfo!'
    }
    for(const card of currentUser.cardCollection) {
        let cardString: string = `${card.quantity} ${card.name} (${card.setName})\n`;
        cards = [...cards, cardString];
    }
    return cards.join('');
    // Loop thorugh every single card the user has
    // returen an object with each card and its quantity

}