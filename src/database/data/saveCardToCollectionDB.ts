import { saveUser, User, UserCardInterface } from "../models/UserCollection"

const saveCardToCollectionDb = async (name: string, userName: string, set: string, discordID: string, quantity?: number) => {
    const currentUser = await User.findOne({discordID: discordID}).exec();

    if(!quantity) {
        quantity = 1;
    }

    if(!currentUser) {
        const collection: [UserCardInterface] = [
            {
                name: name,
                quantity: quantity,
                setName: set,
            }
        ];
        try {
            return await saveUser(userName, discordID, collection);
        } catch (error) {
            throw new Error('Could Not Save Or Find User');
        }
    }

    //  returns out of the function if it finds a card that matches both the set and card names, if not makes a new card and pushes onto original document
    for(const card of currentUser.cardCollection) {
        if(card.name === name && card.setName === set) {
            card.quantity += quantity;
            return await currentUser.save();
        }
    }

    currentUser.cardCollection = [...currentUser.cardCollection, {name: name, quantity: quantity, setName: set}];

    try {
        await currentUser.save();
    } catch (error: any) {
        throw new Error(error);
    }
}

export { saveCardToCollectionDb }