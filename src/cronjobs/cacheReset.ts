import mongoose, { ObjectId } from "mongoose";
import 'dotenv/config'
import { showCollections } from "../database/data/fetchCollections";
import { CollectionInfo } from "mongodb";
import { saveNonValidCard } from "../database/models/NoScryfallListing";
import { saveCard, Card, } from "../database/models/Card";
import { CardCollection, saveCardCollection } from "../database/models/CardCollection";

const mongoDB = process.env.MONGO_URI as string;

const collections: (CollectionInfo | Pick<CollectionInfo, "name" | "type">)[] | null | undefined = showCollections();

mongoose 
 .connect(process.env.MONGO_URI as string, {})   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

 const conn = mongoose.connection



    
      conn.on('open',  async () => {

        let card = await CardCollection.findOne({ name: fakeCard.name }).populate({path: 'sets', model: Card}).exec()

        console.log(card?.sets[0].details)
        conn.close();
    });

const fakeCard = {"object":"card","id":"3d24036e-075f-4991-a740-a9d943722ad2","oracle_id":"09cc8709-fe10-472a-b05c-e89f3523018d","multiverse_ids":[],"tcgplayer_id":273735,"name":"Austere Command","lang":"en","released_at":"2022-06-10","uri":"https://api.scryfall.com/cards/3d24036e-075f-4991-a740-a9d943722ad2","scryfall_uri":"https://scryfall.com/card/clb/687/austere-command?utm_source=api","layout":"normal","highres_image":false,"image_status":"lowres","image_uris":{"small":"https://c1.scryfall.com/file/scryfall-cards/small/front/3/d/3d24036e-075f-4991-a740-a9d943722ad2.jpg?1654114687","normal":"https://c1.scryfall.com/file/scryfall-cards/normal/front/3/d/3d24036e-075f-4991-a740-a9d943722ad2.jpg?1654114687","large":"https://c1.scryfall.com/file/scryfall-cards/large/front/3/d/3d24036e-075f-4991-a740-a9d943722ad2.jpg?1654114687","png":"https://c1.scryfall.com/file/scryfall-cards/png/front/3/d/3d24036e-075f-4991-a740-a9d943722ad2.png?1654114687","art_crop":"https://c1.scryfall.com/file/scryfall-cards/art_crop/front/3/d/3d24036e-075f-4991-a740-a9d943722ad2.jpg?1654114687","border_crop":"https://c1.scryfall.com/file/scryfall-cards/border_crop/front/3/d/3d24036e-075f-4991-a740-a9d943722ad2.jpg?1654114687"},"mana_cost":"{4}{W}{W}","cmc":6.0,"type_line":"Sorcery","oracle_text":"Choose two —\n• Destroy all artifacts.\n• Destroy all enchantments.\n• Destroy all creatures with mana value 3 or less.\n• Destroy all creatures with mana value 4 or greater.","colors":["W"],"color_identity":["W"],"keywords":[],"legalities":{"standard":"not_legal","future":"not_legal","historic":"not_legal","gladiator":"not_legal","pioneer":"not_legal","explorer":"not_legal","modern":"legal","legacy":"legal","pauper":"not_legal","vintage":"legal","penny":"legal","commander":"legal","brawl":"not_legal","historicbrawl":"not_legal","alchemy":"not_legal","paupercommander":"not_legal","duel":"legal","oldschool":"not_legal","premodern":"not_legal"},"games":["paper"],"reserved":false,"foil":false,"nonfoil":true,"finishes":["nonfoil"],"oversized":false,"promo":false,"reprint":true,"variation":false,"set_id":"5e4c3fe8-fd57-4b20-ad56-c03790a16cea","set":"clb","set_name":"Commander Legends: Battle for Baldur's Gate","set_type":"draft_innovation","set_uri":"https://api.scryfall.com/sets/5e4c3fe8-fd57-4b20-ad56-c03790a16cea","set_search_uri":"https://api.scryfall.com/cards/search?order=set\u0026q=e%3Aclb\u0026unique=prints","scryfall_set_uri":"https://scryfall.com/sets/clb?utm_source=api","rulings_uri":"https://api.scryfall.com/cards/3d24036e-075f-4991-a740-a9d943722ad2/rulings","prints_search_uri":"https://api.scryfall.com/cards/search?order=released\u0026q=oracleid%3A09cc8709-fe10-472a-b05c-e89f3523018d\u0026unique=prints","collector_number":"687","digital":false,"rarity":"rare","card_back_id":"0aeebaf5-8c7d-4636-9e82-8c27447861f7","artist":"Anna Steinbauer","artist_ids":["3516496c-c279-4b56-8239-720683d03ae0"],"illustration_id":"7c6a01f8-e1f6-4fe4-b275-b2582be98783","border_color":"black","frame":"2015","security_stamp":"oval","full_art":false,"textless":false,"booster":false,"story_spotlight":false,"edhrec_rank":158,"penny_rank":5507,"prices":{"usd":"1.19","usd_foil":null,"usd_etched":null,"eur":null,"eur_foil":null,"tix":null},"related_uris":{"tcgplayer_infinite_articles":"https://infinite.tcgplayer.com/search?contentMode=article\u0026game=magic\u0026partner=scryfall\u0026q=Austere+Command\u0026utm_campaign=affiliate\u0026utm_medium=api\u0026utm_source=scryfall","tcgplayer_infinite_decks":"https://infinite.tcgplayer.com/search?contentMode=deck\u0026game=magic\u0026partner=scryfall\u0026q=Austere+Command\u0026utm_campaign=affiliate\u0026utm_medium=api\u0026utm_source=scryfall","edhrec":"https://edhrec.com/route/?cc=Austere+Command"},"purchase_uris":{"tcgplayer":"https://www.tcgplayer.com/product/273735?page=1\u0026utm_campaign=affiliate\u0026utm_medium=api\u0026utm_source=scryfall","cardmarket":"https://www.cardmarket.com/en/Magic/Products/Search?referrer=scryfall\u0026searchString=Austere+Command\u0026utm_campaign=card_prices\u0026utm_medium=text\u0026utm_source=scryfall","cardhoarder":"https://www.cardhoarder.com/cards?affiliate_id=scryfall\u0026data%5Bsearch%5D=Austere+Command\u0026ref=card-profile\u0026utm_campaign=affiliate\u0026utm_medium=card\u0026utm_source=scryfall"}};