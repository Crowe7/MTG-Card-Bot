import { Attachment } from "discord.js";

export const attachmentHandler = async (attachment: Attachment) => {

    let attachmentType = attachment.attachment.toString().slice(-3);

    if( attachmentType !== "txt") {
        return
    }

    const attachmentTextData = await fetch(attachment.url)
        .then( response => response.text());
    const bulkTextDataArray = attachmentTextData.split(/\r\n|\r|\n/);

    return bulkTextDataArray;
}