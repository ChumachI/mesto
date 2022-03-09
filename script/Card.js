import {openPopup, closePopup} from "./utils.js";
import {zoomImage, zoomLable, zoom} from './constants.js';

export {Card}

class Card {
    constructor(data, cardTemplateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._element = document.querySelector(cardTemplateSelector).content
        .querySelector('.place').cloneNode(true);
        this._closeZoomButton = zoom.querySelector('.popup__close');
        this._closeZoomButton.addEventListener('click', this._closeZoomPopup);
    }

    generateCard() {
        this._likeButton = this._element.querySelector('.place__like');
        this._deleteButton = this._element.querySelector('.place__delete');
        this._image = this._element.querySelector('.place__image');

        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.place__name').textContent = this._name;
        

        this._setEventListeners();
     
        return this._element;
    }
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', this._switchLike);// привязать обработчик кнопки лайк
        this._deleteButton.addEventListener('click', this._deletePlace);// привязать обработчик удаления
        this._image.addEventListener('click', this._openZoomPopup);// привязать зум по нажатию на картинку
    }

    _switchLike = () => { 
        this._likeButton.classList.toggle('place__like_active');
    }

    _deletePlace = () => { 
        this._element.remove();
    }

    _openZoomPopup() {
        zoomImage.src = this.src;
        zoomImage.alt = this.alt;
        zoomLable.textContent = this.alt;
        openPopup(zoom);
        
    }

    _closeZoomPopup() {
        closePopup(zoom);
    }
}