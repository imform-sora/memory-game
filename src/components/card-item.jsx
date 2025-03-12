import "../components/card-item.css";

export default function CardItem({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className={flipped ? "card-box is-active" : "card-box"}>
      <img className="front" src={card.src} alt="front" />
      <div className="back" onClick={handleClick}></div>
    </div>
  );
}
