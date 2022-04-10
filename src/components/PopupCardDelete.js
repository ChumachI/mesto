import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._buttonYes = this._popup.querySelector('.popup__save');
    }

    setEventListeners(){
        super.setEventListeners();
        this._buttonYes.addEventListener('click',(evt)=>{ 
            this._handleDelete(evt)
        })
    }
    
    setsubmitHandler(handler){
        this._handleDelete = handler;
    }
}