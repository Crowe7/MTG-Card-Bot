import { unlinkSync } from "fs";

export const deleteCollectionFile = () => {
    unlinkSync('collection.txt');
}
