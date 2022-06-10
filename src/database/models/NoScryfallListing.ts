import { model, Schema } from "mongoose"


interface NoCardInterface {
    name: string
}

const NoCardSchema = new Schema<NoCardInterface>({
    name: { type: String, required: true}
});

const NoCard = model<NoCardInterface>('Non-valid Cards', NoCardSchema);

export const saveNonValidCard = async (name: string) => {
    const cardToSave = new NoCard({ name: name });

    await cardToSave.save();
}