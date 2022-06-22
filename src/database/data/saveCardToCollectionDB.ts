import { saveUser, User, UserCardInterface } from "../models/UserCollection"

const saveCardToCollectionDb = async (name: string, set: string, discordID: number) => {
    const currentUser = await User.findOne({discordID: discordID}).exec();

    if(!currentUser) {
        const collection: [UserCardInterface] = [
            {
                name: name,
                quantity: 1,
                setName: set,
            }
        ];
        return await saveUser(name, discordID, collection);
    }

    //  returns out of the function if it finds a card that matches both the set and card names, if not makes a new card and pushes onto original document
    for(const card of currentUser.cardCollection) {
        if(card.name === name && card.setName === set) {
            card.quantity += 1;
            return await currentUser.save();
        }
    }

    currentUser.cardCollection = [...currentUser.cardCollection, {name: name, quantity: 1, setName: set}];

    try {
        await currentUser.save();
    } catch (error) {
        console.log(error);
    }
}

export { saveCardToCollectionDb }