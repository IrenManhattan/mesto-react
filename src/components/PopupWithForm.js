import React from 'react';

function PopupWithForm(props) {
    const name = props.name;
    const title = props.title;
    const buttonText = props.buttonText;
    const children = props.children;

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`} id={`popup__${name}`}>
      <div className="popup__container" id={`popup__container-${name}`}>
        <button type="button" 
            className="popup__exit" 
            id={`popup__exit_${name}`}
            onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form 
            className="popup__form" 
            name={name} 
            id={`${name}_form`} 
          >
            {children}
          <button 
          type="submit" 
          className="popup__button" 
          id="save_button">
          {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm