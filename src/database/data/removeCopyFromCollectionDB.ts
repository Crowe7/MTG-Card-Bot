import { User } from "../models/UserCollection";

export const removeCopyFromCollectionDB = async (discordID: string, cardName: string, setName: string, quantity?: number) => {


    if(!quantity) {
        quantity = 1;
    };
    
    const currentUser = await User.findOne({discordID: discordID}).exec();

    if(!currentUser) {
        throw new Error('Could not find user....');
    }

    for(const card of currentUser.cardCollection) {
        if(card.name === cardName && card.setName === setName || setName === '') {

            card.quantity -= quantity;
            if (card.quantity <= 0) {
                currentUser.cardCollection = currentUser.cardCollection.filter( card => card.name !== cardName && card.setName !== setName);
            }

            return await currentUser.save();
        }
    }

    // throws if no card was found
    throw new Error
}