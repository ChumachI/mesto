import Popup from "./Popup.js";
/*Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open.*/
export default class PopupWithImage extends Popup {
    constructor(popupSelector,card) {
        super(popupSelector);
        this._zoomImage = this._popup.querySelector('.popup__zoom-image');
        this._zoomLable = this._popup.querySelector('.popup__zoom-label');
        this._image = card.generateCard().querySelector('.place__image');
    }
/*В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке. */
    open() {
        this._zoomImage.src = this._image.src;
        this._zoomImage.alt = this._image.alt;
        this._zoomLable.textContent = this._image.alt;
        super.open();
    }
}