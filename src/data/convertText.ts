const reducer = (characters: string[]): string[] => {
    const reduced = characters.reduce( (filtered: string[], char) => {
        if(char !== char.toUpperCase()) {
            let lowercased = char.toLowerCase();
            filtered.push(lowercased);
        }
        return filtered;
    }, []);

    return reduced;
}

export const stripAndForceLowerCase = (word: string) => {
    const splitText: string[] = word.split("");
    const finalText = reducer(splitText).join('');

    return finalText;
}