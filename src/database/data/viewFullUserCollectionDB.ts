import { User, UserCardInterface } from "../models/UserCollection";

export const viewFullUserCollectionDB = async (discordID: string): Promise<UserCardInterface[]> => {
    const currentUser = await User.findOne({discordID: discordID}).exec();

    if(!currentUser || currentUser.cardCollection.length === 0) {
        throw new Error ('No collection found... Try Adding some cards first with /cardinfo!');
    }

    return currentUser.cardCollection;

}