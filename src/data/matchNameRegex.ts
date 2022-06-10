export const matchName = (word: string) => {
    const match = new RegExp(`^${word}.*$`);
    return match
}
