import { model, Schema } from "mongoose"

// might need to change sets from being an object array into a string as we have to poulate the card into the spot
interface CardCollectionInterface {
    name: string,
    sets: object[]
    
}

const CardCollectionSChema = new Schema<CardCollectionInterface>({
    name: { type: String, required: true},
    sets: [{ type: Schema.Types.ObjectId, ref: 'Card', required: true }]
});

const NoCard = model<CardCollectionInterface>('Card Printings', CardCollectionSChema);

export const saveCardCollection = async (name: string, cardData: object[]) => {
    const cardToSave = new NoCard({ name: name, sets: cardData });

    await cardToSave.save();
}