import React, { useState, useEffect } from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
}
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
}
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
}
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
}
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
}

  return (
<div className="root">
  <Header />
  
  <Main 
    onEditProfile={handleEditProfileClick}
    onEditAvatar={handleEditAvatarClick}
    onAddPlace={handleAddPlaceClick}
    onCardClick={handleCardClick}
  />
  <Footer />

  <PopupWithForm
    title="Редактировать профиль"
    onClose={closeAllPopups}
    isOpen={isEditProfilePopupOpen}
    name={"profile"}
    buttonText="Сохранить"
  >
    <input
      type="text"
      id="new-name"
      placeholder="Имя"
      className="popup__input"
      name="name"
      minLength="2"
      maxLength="40"
      required              
    />
    <span 
      className="error-message error-message_visible"
      id="error-new-name"
    ></span>
    <input
      type="text"
      placeholder="Вид деятельности"
      className="popup__input"
      id="new-profession"
      name="about"
      minLength="2"
      maxLength="200"
      required
    />
    <span 
      className="error-message error-message_visible"
      id="error-new-profession"
    ></span>
  </PopupWithForm>

  <PopupWithForm
    title="Новое место"
    onClose={closeAllPopups}
    isOpen={isAddPlacePopupOpen}
    name={"edit_card"}
    buttonText="Создать"
  >
    <input
        type="text"
        placeholder="Название"
        className="popup__input"
        id="new-title"
        name="name"
        minLength="2"
        maxLength="30"
        required
    />
    <span 
      className="error-message error-message_visible"
      id="error-new-title"
    ></span>
    <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="new-link"
        name="link"
        required
    />
    <span 
      className="error-message error-message_visible"
      id="error-new-link"
    ></span>
  </PopupWithForm>

  <PopupWithForm title={"Вы уверены?"} name={"edit_confirm"} buttonText={"Да"} />

  <PopupWithForm
    title="Обновить аватар"
    onClose={closeAllPopups}
    isOpen={isEditAvatarPopupOpen}
    name={"avatar"}
    buttonText="Сохранить"
  >
    <input
        type="url"
        placeholder="Ссылка на аватар"
        className="popup__input"
        id="new-link-avatar"
        name="avatar"
        required
    />
    <span 
      className="error-message error-message_visible"
      id="error-new-link-avatar"
    ></span>
  </PopupWithForm>

  <ImagePopup card={selectedCard} onClose={closeAllPopups} />
</div>
  );
}

export default App;
