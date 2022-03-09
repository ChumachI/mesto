export {openPopup, closePopup};



function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupOnEsc);
}

function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupOnEsc);
}

function closePopupOnEsc(evt){
    if(evt.key === 'Escape'){
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
}