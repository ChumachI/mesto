import Popup from "./Popup.js";
/**Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.*/

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._formSubmit = submitForm;
    }

    /**Содержит приватный метод _getInputValues, который собирает данные всех полей формы. */
    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__field');
        this._formValues = {};
        this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;});
        return this._formValues;
    }

    /**Перезаписывает родительский метод setEventListeners. 
     * Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
     * но и добавлять обработчик сабмита формы. */
    setEventListeners() {
       super.setEventListeners();
       this._form = this._popup.querySelector('.popup__form');
       this._form.addEventListener('submit', (evt) => {
           this._formSubmit(evt)
        });
    }
    
    /*Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.*/
    close() {
        super.close();

        this._form.reset();
    }
}