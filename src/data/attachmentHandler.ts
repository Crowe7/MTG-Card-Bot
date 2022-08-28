import { Attachment } from "discord.js";
import { statSync } from "fs";
// max file size
const MAX_FILE_SIZE = 2000;


export const attachmentHandler = async (attachment: Attachment) => {
    let attachmentType = attachment.attachment.toString().slice(-3);

    if( attachmentType !== "txt" || attachment.size < MAX_FILE_SIZE) {
        return
    }

    const attachmentTextData = await fetch(attachment.url)
        .then( response => response.text());
    const bulkTextDataArray = attachmentTextData.split(/\r\n|\r|\n/);

    return bulkTextDataArray;
}