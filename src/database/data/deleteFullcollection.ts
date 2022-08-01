import { User } from "../models/UserCollection";

export const deleteFullCollection = async (discordID: string) => {
    try {
        await User.deleteOne({discordID: discordID}).exec();
    } catch(err) {
        return `${err}`;
    };
};
