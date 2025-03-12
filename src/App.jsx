import { useEffect, useState } from "react";
import "./App.css";
import CardItem from "./components/card-item";
import { shuffle } from "lodash";

const cardImages = [
  { src: "/images/card-01.jpeg", matched: false },
  { src: "/images/card-02.jpeg", matched: false },
  { src: "/images/card-03.jpeg", matched: false },
  { src: "/images/card-04.jpeg", matched: false },
  { src: "/images/card-05.jpeg", matched: false },
  { src: "/images/card-06.jpeg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", shuffleCards());
  }, []);

  // shuffle cards
  const shuffleCards = () => {
    const cardsArray = [...cardImages, ...cardImages];
    const shuffledCards = shuffle(cardsArray).map((el, index) => ({
      ...el,
      id: index,
    }));

    setCards(shuffledCards);
  };

  // 카드 순서 체크
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // 카드 src 비교
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        // 카드 업데이트
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        resetTurn(choiceTwo);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log("choiceOne", choiceOne);
  console.log("choiceTwo", choiceTwo);

  // reset
  const resetTurn = (choiceTwo) => {
    if (choiceTwo) {
      setChoiceOne(choiceTwo);
    } else {
      setChoiceOne(null);
    }
    setChoiceTwo(null);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <div className="card-container">
        {cards.map((card) => (
          <CardItem
            key={card}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
