export const bulkRemoveFromDB = (discordId: string, bulkData?: string | null) => {

    if(!bulkData) {
        throw new Error('No cards provided to remove!');
    }
    return  'NOT IMPLEMENTED YET'
    // takes bulk data from interaction and then 
    /*
        loops through each card provided then removes that card quantity from the db.
            check user for each card and remove if quantity goes below the number
        remove to the quantity based on the number in from of the card.

        returns an object with each card that was removed. 
            put quantity for each card if it didnt get completly removed
                if it did get completly removed just put that the card was removed
    */
}