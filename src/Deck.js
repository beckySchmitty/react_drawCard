import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import axios from "axios";


const Deck = () => {
    const [cards, setCards] = useState([]);
    const [deckID, setDeckID] = useState(null);
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function getDeck() {
            const resp = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            setDeckID(resp.data.deck_id)
        }
        getDeck()
      }, [setDeckID]);

      
      useEffect(() => {
        /* Draw a card via API, add card to state "drawn" list */
        async function getCard() {
    
          try {
            let drawResp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/`);
    
            if (drawResp.data.remaining === 0) {
              setAutoDraw(false);
              throw new Error("no cards remaining!");
            }
    
            const card = drawResp.data.cards[0];
    
            setCards(c => [
              ...c,
              {
                id: card.code,
                name: card.suit + " " + card.value,
                image: card.image
              }
            ]);
          } catch (err) {
            alert(err);
          }
        }
    
        if (autoDraw && !timerRef.current) {
          timerRef.current = setInterval(async () => {
            await getCard();
          }, 1000);
        }
    
        return () => {
          clearInterval(timerRef.current);
          timerRef.current = null;
        };
      }, [autoDraw, setAutoDraw, cards]);


      const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto);
      };
    

    return (
        <div className="Deck">
        {deckID ? (
          <button className="Deck-get" onClick={toggleAutoDraw}>
            {autoDraw ? "STOP DRAWING" : "KEEP DRAWING"} 
          </button>
        ) : null}
        <div className="Deck-cards">{cards.map(c => (
            <Card key={c.id} name={c.name} img={c.image} />
        ))}</div>
      </div>
    )
}

export default Deck;