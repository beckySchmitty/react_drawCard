import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import axios from "axios";


const Deck = () => {
    const [cards, setCards] = useState([]);
    const [deckID, setDeckID]

    useEffect(() => {
        async function getDeck() {
            const resp = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            setDeckID(resp.data.deck_id)
        }

        async function getCard() {
            const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
            setCards(resp.data.img)
        };
        getDeck();
        getCard();
    }, [cards])

    return (
        <div>
            {cards.map(c => <Card img={c.img} />)}
            <button onClick={drawCard}>Draw Card</button>
        </div>
    )
}

export default Deck;