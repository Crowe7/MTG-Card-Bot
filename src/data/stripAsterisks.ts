const stripFieldText = (text: string) => {
    let noAsterisks = []
    let splitText = text.split('');
    for(const char of splitText) {
        if(char !== "*") {
            noAsterisks.push(char);
        }
    }
    return noAsterisks.join('')
}