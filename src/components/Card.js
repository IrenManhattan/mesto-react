import React from "react";

function Card(props) {
   function handleClick() {
      props.onCardClick(props.card);
   }

   return (
    <article className="element">
        <button className="element__delete" type="button"></button>
        <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
        <div className="element__caption">
            <h2 className="element__text">{props.card.name}</h2>
            <div className="element__like-container">
                <button className="element__like" type="button"></button>
                <span className="element__like-count">{props.card.likes.length}</span>
            </div>
        </div>
    </article>
);
}

export default Card;



