export const matchName = (word: string) => {
    const match = new RegExp(`^${word}.*$`);
    return match
}
// this might need to change to just allow the text to match ANYWHERE instead of just the start.