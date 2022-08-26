export const stripSetBrackets = (text: string | undefined) => {
    if(text === undefined) {
        return '';
    }
    let noBrackets = []
    let splitText = text.split('');
    for(const char of splitText) {
        if(char !== "[" && char !== "]" && char !== "(" && char !== ")" ) {
            noBrackets.push(char);
        }
    }
    return noBrackets.join('')
}