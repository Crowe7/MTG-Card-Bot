import { model, ObjectId, Schema } from "mongoose"
import { CardInterface } from "./Card";


// might need to change sets from being an object array into a string as we have to poulate the card into the spot
interface CardCollectionInterface {
    name: string,
    sets: ObjectId[] | CardInterface[]
    
}

const CardCollectionSchema = new Schema<CardCollectionInterface>({
    name: { type: String, required: true},
    sets: [{ type: Schema.Types.ObjectId, ref: 'Card', required: true }]
});

const CardCollection = model<CardCollectionInterface>('Card Printings', CardCollectionSchema);

// might need to say cardData is a string as we are just saving the objectId from mongoose
export const saveCardCollection = async (name: string, cardData: ObjectId[]) => {
    const cardToSave = new CardCollection({ name: name, sets: cardData });

    await cardToSave.save();
}

export {CardCollection}
// need to build the cardData first by populating an array with results 