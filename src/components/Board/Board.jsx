import React, { useState } from "react";
import Card from "../Card/Card";
import "./Board.scss";
import { generateID } from "../../utils";

export default function Board() {
  const cardInfo = JSON.parse(localStorage.getItem("cardDetails"));
  const defaultCardData = [
    {
      id: generateID(),
      title: "TO - DO",
      tasks: [],
    },
    {
      id: generateID(),
      title: "IN PROGRESS",
      tasks: [],
    },
    {
      id: generateID(),
      title: "DONE",
      tasks: [],
    },
  ];
  const [cards, setCards] = useState(cardInfo ?? defaultCardData);

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: generateID(),
        title: "",
        tasks: [],
      },
    ]);
  };

  const deleteCard = (index) => {
    if (cards.length > 1) {
      const newCards = [...cards];
      newCards.splice(index, 1);
      setCards(newCards);
    }
  };

  const updateCard = (index, details) => {
    const newCards = [...cards];
    newCards[index] = details;
    setCards(newCards);
    localStorage.setItem("cardDetails", JSON.stringify(newCards));
  };

  const handleDrop = (e, currentCardIndex) => {
    const sourceCardIndex = +e.dataTransfer.getData("sourceCardIndex");
    const sourceTaskIndex = +e.dataTransfer.getData("sourceTaskIndex");

    // Skip if dropped into the same card
    if (currentCardIndex === sourceCardIndex) {
      return;
    }

    const newCards = [...cards];
    const sourceTask = newCards[sourceCardIndex].tasks[sourceTaskIndex];
    newCards[currentCardIndex].tasks.push(sourceTask);
    newCards[sourceCardIndex].tasks.splice(sourceTaskIndex, 1);

    setCards(newCards);
    localStorage.setItem("cardDetails", JSON.stringify(newCards));
  };

  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          details={card}
          preventDelete={index === 0 && cards.length === 1}
          index={index}
          onDelete={() => deleteCard(index)}
          onDetailsChange={(details) => updateCard(index, details)}
          onDrop={(e) => handleDrop(e, index)}
        ></Card>
      ))}

      <button className="board__add-button" onClick={addCard}>
        +
      </button>
    </div>
  );
}
