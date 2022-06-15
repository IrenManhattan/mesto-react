import React from "react";
import { api } from "../utils/Api.js";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([profile, cards]) => {
            setUserName(profile.name);
            setUserDescription(profile.about);
            setUserAvatar(profile.avatar);
            setCards(cards);
        })
        .catch(err => { console.log(err) })
},[]);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <div className="profile__avatar-button" type="button" aria-label="Сменить_аватар" onClick={props.onEditAvatar}>
          <img className="profile__photo" src={userAvatar} alt="Аватар"/>
         </div>
          <div className="profile__container">
            <div className="profile__info">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__prof">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;