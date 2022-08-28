import { Attachment } from "discord.js";
import { bulkCardParse } from "../../data/bulkCardParser";
import { convertToTXT } from "../../data/convertTextToTXT";
import { removeCopyFromCollectionDB } from "./removeCopyFromCollectionDB";

export const bulkRemoveFromDB = async (discordId: string, bulkData?: Attachment) => {

    if(!bulkData) {
        throw new Error(" No cards provided to remove!!");
    }

    let succRemoved:string[] = ['CARDS REMOVED SUCCESSFULLY! \n'];
    let failRemoved:string[] = ['\n\nCARD FAILED TO BE REMOVED! \n'];

    const bulkDataArr = await bulkCardParse(bulkData);

    for (let cardInfo of bulkDataArr) {
        try {
            await removeCopyFromCollectionDB(discordId, cardInfo.name, cardInfo.set, cardInfo.quantity);
            succRemoved = [...succRemoved, cardInfo.name + '\n'];
        } catch(err) {
            failRemoved = [...failRemoved, cardInfo.name + '\n'];
        }
    }

    let removedText = [...succRemoved, ...failRemoved].join('')
    convertToTXT(removedText);
}