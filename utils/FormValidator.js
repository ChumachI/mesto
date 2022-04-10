 export class FormValidator {
    constructor(settings, formSelector) {
        this._settings = settings;
        this._form = document.querySelector(formSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
          this._setEventListeners();
        }
    _setEventListeners() {
            this.toggleButtonState();
            this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.toggleButtonState();
            });
        });
    } 
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    } 
    _showInputError(inputElement, errorMessage){
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }
    _hideInputError(inputElement){
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }
    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }
    _hasInvalidInput(){
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
    } 
}