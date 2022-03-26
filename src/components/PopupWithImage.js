import Popup from "./Popup.js";
/*Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open.*/
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomImage = this._popup.querySelector('.popup__zoom-image');
        this._zoomLable = this._popup.querySelector('.popup__zoom-label');
    }
/*В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке. */
    open(image) {
        this._zoomImage.src = image.src;
        this._zoomImage.alt = image.alt;
        this._zoomLable.textContent = image.alt;
        super.open();
    }
}