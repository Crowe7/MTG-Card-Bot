export const stripFieldText = (text: string | undefined) => {
    if(text === undefined) {
        return '';
    }
    let noAsterisks = []
    let splitText = text.split('');
    for(const char of splitText) {
        if(char !== "*") {
            noAsterisks.push(char);
        }
    }
    return noAsterisks.join('')
}