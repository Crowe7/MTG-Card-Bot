import { viewFullUserCollectionDB } from "../database/data/viewFullUserCollectionDB";
import { UserCardInterface } from "../database/models/UserCollection";

    export const viewFullCollection = async (discordID: string): Promise<string> => {

        try {
            let collection = await viewFullUserCollectionDB(discordID)

            let cards: string[] = [];

            for(const card of collection) {
                let cardString: string = `${card.quantity} ${card.name} (${card.setName})\n`;
                cards = [...cards, cardString];
            }
            let collectionString = cards.join('');
        
            return collectionString;

        } catch(err:any) {
            throw new Error(err)
        }

    }