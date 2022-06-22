import { model, Schema, SchemaTypes } from "mongoose"

interface UserInterface {
    name: string,
    discordID: number,
    collection: [UserCardInterface]
}

interface UserCardInterface {
    name: string,
    quantity: number,
    setName: string
}

const UserSchema = new Schema<UserInterface>({
    name: { type: String, required: true},
    discordID: { type: Number, required: true},
    collection: [
        {
            name: { type: String, required: true},
            quantity: { type: String, required: true},
            setName: { type: String, required: true}
        }
    ]
})

const User = model<UserInterface>('User', UserSchema)

export const saveUser = async (name: string, discordID: number, collection: [UserCardInterface]) => {
    const userToSave = new User({name: name, discordID: discordID, collection: collection});

    await userToSave.save();
}




/*
WRITE SCHEMA AND MODEL FOR THE USER THEMSELVES
id for the specific user, and cards array

WRITE SCHEMA AND MODEL FOR USERS CARDS
name, details for card and quntity
*/