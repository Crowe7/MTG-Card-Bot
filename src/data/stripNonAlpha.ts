export const strip = (word: string) => {
    const finalText: string = word.split("").filter(char => char !== char.toUpperCase()).join("");
    return finalText;
}