import React from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { api } from "../utils/Api";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardSelectedForDelete, setCardSelectedForDelete] = React.useState({});

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([item, cardsData]) => {
            const data= {
                name: item.name,
                about: item.about,
                avatar: item.avatar,
                _id: item._id
            }
            setCurrentUser(data);
            setCards(cardsData);
        })
        .catch((err) => console.log(err))
}, [])



function handleConfirmDeleteClick(card) {
    setCardSelectedForDelete(card);
    setIsConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
}

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
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({});
    setCardSelectedForDelete({});
}

const handleUpdateUser = (name, about) => {
    setIsLoading(true);
    api.editProfile(name, about)
        .then((item) => {
            setCurrentUser(item);
            closeAllPopups();
        })
        .catch((err) =>
            console.log(`Ошибка ${err}`))
        .finally(() => {
            setIsLoading(false);
        })
};

const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.editAvatar(avatar)
        .then((item) => {
            setCurrentUser(item);
            closeAllPopups();
        })
        .catch((err) =>
            console.log(`Ошибка ${err}`))
        .finally(() => {
            setIsLoading(false);
        })
};

const handleAddPlaceSubmit = (name, link) => {
    setIsLoading(true);
    api.addUserCard(name, link)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) =>
            console.log(`Ошибка ${err}`))
        .finally(() => {
            setIsLoading(false);
        })
};

const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const changeLikeCardStatus = !isLiked
        ? api.addLike(card._id)
        : api.deleteLike(card._id);
    changeLikeCardStatus
        .then((newCard) => {
            setCards((item) =>
                item.map((c) => (c._id === card._id ? newCard : c))
            );
        })
        .catch((err) => console.log(`Ошибка ${err}`));
};


const handleCardDelete = (card) => {
    setIsLoading(true);
    api.deleteCard(card._id)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id));
            closeAllPopups();
        })
        .catch((err) => console.log(`Ошибка ${err}`))
        .finally(() => {
            setIsLoading(false);
        })
};

React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });
}, []);


  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}> 
        <Header />
        
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onConfirmDelete={handleConfirmDeleteClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          card={cardSelectedForDelete}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />


        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
