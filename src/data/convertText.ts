const reducer = (characters: string[]): string[] => {
    const reduced = characters.reduce( (filtered: string[], char) => {
    	let lowerchar = char.toLowerCase();
        if(lowerchar !== char.toUpperCase() || isNaN(parseInt(char)) === false) {
            filtered.push(lowerchar);
        }
        return filtered;
    }, []);

    return reduced;
}
export const stripAndForceLowerCase = (word: string) => {
    if(!word) {
        return ''
    }
    const splitText: string[] = word.split("");
    const finalText = reducer(splitText).join('');

    return finalText;
}
