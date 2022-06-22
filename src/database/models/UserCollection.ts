import { model, Schema, SchemaTypes } from "mongoose"

interface UserInterface {
    name: string,
    discordID: number,
    cardCollection: UserCardInterface[]
}

interface UserCardInterface {
    name: string,
    quantity: number,
    setName: string
}

const UserSchema = new Schema<UserInterface>({
    name: { type: String, required: true},
    discordID: { type: Number, required: true},
    cardCollection: [
        {
            name: { type: String, required: true},
            quantity: { type: String, required: true},
            setName: { type: String, required: true}
        }
    ]
})

const User = model<UserInterface>('User', UserSchema)

const saveUser = async (name: string, discordID: number, collection: [UserCardInterface]) => {
    const userToSave = new User({name: name, discordID: discordID, collection: collection});

    await userToSave.save();
}

export {UserCardInterface, User, saveUser}