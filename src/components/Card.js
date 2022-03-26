import PopupWithImage from "./PopupWithImage.js";
/**Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. 
 * Эта функция должна открывать попап с картинкой при клике на карточку. */
export default class Card {
    constructor({name,link}, cardTemplateSelector, handleCardClick) {
        this._name =  name;
        this._link =  link;
        this._element = document.querySelector(cardTemplateSelector).content
        .querySelector('.place').cloneNode(true);
        this._handleCardClick = handleCardClick;
        this._likeButton = this._element.querySelector('.place__like');
        this._deleteButton = this._element.querySelector('.place__delete');
        this._image = this._element.querySelector('.place__image');

        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.place__name').textContent = this._name;
        this._setEventListeners(); 
    }
    generateCard() {         
        return this._element;
    }
    _setEventListeners() {
        this._likeButton.addEventListener('click', ()=> {this._switchLike()});// привязать обработчик кнопки лайк
        this._deleteButton.addEventListener('click', ()=> {this._deletePlace()});// привязать обработчик удаления
        this._image.addEventListener('click', ()=>  {this._handleCardClick(this._image)});// привязать зум по нажатию на картинку
    }
    _switchLike = () => { 
        this._likeButton.classList.toggle('place__like_active');
    }
    _deletePlace = () => { 
        this._element.remove();
        this._element = null;
    }
}