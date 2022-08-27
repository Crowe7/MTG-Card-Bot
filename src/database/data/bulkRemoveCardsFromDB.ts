import { Attachment } from "discord.js";
import { attachmentHandler } from "../../data/attachmentHandler";
import { bulkCardParse } from "../../data/bulkCardParser";
import { stripAndForceLowerCase } from "../../data/convertText";
import { convertToTXT } from "../../data/convertTextToTXT";
import { removeCopyFromCollectionDB } from "./removeCopyFromCollectionDB";
import { viewFullUserCollectionDB } from "./viewFullUserCollectionDB";

interface CardToRemoveInterface {
    name: string,
    quantity: number,
    set: string
}

export const bulkRemoveFromDB = async (discordId: string, bulkData?: Attachment) => {

    if(!bulkData) {
        throw new Error(" No Attachment provided!");
    }

    let succRemoved:string[] = ['CARDS REMOVED SUCCESSFULLY! \n'];
    let failRemoved:string[] = ['\n\nCARD FAILED TO BE REMOVED! \n'];

    const bulkDataArr = await bulkCardParse(bulkData);

    for (let cardInfo of bulkDataArr) {
        try {
            await removeCopyFromCollectionDB(discordId, cardInfo.name, cardInfo.set, cardInfo.quantity);
            succRemoved = [...succRemoved, cardInfo.name + '\n'];
        } catch(err) {
            console.log(err)
            failRemoved = [...failRemoved, cardInfo.name + '\n'];
            console.log(failRemoved)
        }
    }

    let removedText = [...succRemoved, ...failRemoved].join('')
    convertToTXT(removedText);
}