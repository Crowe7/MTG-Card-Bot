import { model, Schema } from "mongoose"


interface CardInterface {
    name: string,
    set: string,
    details: {[key: string]: any}
}

const isCard = (item: CardInterface | any): item is CardInterface => {
    return (item && item.set && typeof item.set === 'string');
}

const CardSchema = new Schema<CardInterface>({
    name: { type: String, required: true},
    set: {type: String, required: true},
    details: {type: Schema.Types.Mixed, required: true}
});

const Card = model<CardInterface>('Card', CardSchema);

export const saveCard = async (name: string, set: string, details: {[key: string]: any} ) => {
    const cardToSave = new Card({ name: name, set: set, details: details });
    await cardToSave.save();
}

export {Card, CardInterface, isCard}