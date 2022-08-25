import { User, UserCardInterface } from "../models/UserCollection";

export const viewFullUserCollectionDB = async (discordID: string): Promise<UserCardInterface[]> => {
    const currentUser = await User.findOne({discordID: discordID}).exec();
    
    if(!currentUser) {
        throw new Error ('No collection found... Try Adding some cards first with /cardinfo!');
    }
    return currentUser.cardCollection;

}