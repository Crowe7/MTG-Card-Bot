import { model, Schema, SchemaTypes } from "mongoose"

interface UserInterface {
    userName: string,
    discordID: string,
    cardCollection: UserCardInterface[]
}

interface UserCardInterface {
    name: string,
    quantity: number,
    setName: string
}

const UserSchema = new Schema<UserInterface>({
    userName: { type: String, required: true},
    discordID: { type: String, required: true},
    cardCollection: [
        {
            name: { type: String, required: true},
            quantity: { type: Number, required: true},
            setName: { type: String, required: true}
        }
    ]
})

const User = model<UserInterface>('User', UserSchema)

const saveUser = async (name: string, discordID: string, collection: UserCardInterface[]) => {
    const userToSave = new User({userName: name, discordID: discordID, cardCollection: collection});
    await userToSave.save();
}

export {UserCardInterface, User, saveUser}