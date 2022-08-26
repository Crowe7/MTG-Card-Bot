import { Attachment } from "discord.js";

export const attachmentHandler = async (attachment: Attachment) => {
    
    const attachmentTextData = await fetch(attachment.url)
        .then( response => response.text());
    const bulkTextDataArray = attachmentTextData.split(/\r\n|\r|\n/);

    return bulkTextDataArray;
}