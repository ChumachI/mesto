/*Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.*/
export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    //Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup',this._handleEscClose);
    }
    /*Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.*/
    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        }
    }
    /*Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
    Модальное окно также закрывается при клике на затемнённую область вокруг формы. */
    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close');
        closeButton.addEventListener('click', (evt)=> {
            this.close();
        });
        this._popup.addEventListener('mousedown',(evt)=>{
            evt.stopPropagation();
            if(evt.target.classList.contains('popup')){
                this.close();
            }
        })
    }
}
