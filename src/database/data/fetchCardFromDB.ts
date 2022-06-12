// when fetching a card from the db, maybe check if setname is being usedm if not just use that name to search the Card collection
// if setname is being query the actual CardCollection to check for the cards specific name
    // then check each card inside and see if the set matches
    // if you find a match return that card info
    // if no match just return the first card in the array itself.
    


/*

          const cardArr = []
        await saveCard(fakeCard.name, fakeCard.set, fakeCard);

        let card = await Card.findOne({ name: fakeCard.name }).exec();

        cardArr.push(card?._id as unknown as ObjectId);

        console.log(card)
        await saveCardCollection(fakeCard.name, cardArr);
*/

/*

        let card = await CardCollection.findOne({ name: fakeCard.name }).populate({path: 'sets', model: Card}).exec()
        if (isCard(card?.sets[0])) {
            console.log(card?.sets[0].details.name);
        } else {
            console.log('Not type card');
        }
*/

// https://stackoverflow.com/questions/26818071/mongoose-schema-hasnt-been-registered-for-model