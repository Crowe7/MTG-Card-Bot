import { writeFileSync } from "fs"

export const convertToTXT = (string: string ) => {

    // takes text and uses fs node stuff to convert into a txt file then return that for an attachment to collection
    writeFileSync('collection.txt', string, {
        encoding: 'utf8',
        flag: 'w',
    });
}
