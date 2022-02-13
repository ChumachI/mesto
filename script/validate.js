//Включить валидацию
function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      setEventListeners(formElement);
    });
}

//установка слушателей на поля
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
    const buttonElement = formElement.querySelector('.popup__save');

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
      });
    });
} 

//проверка поля на валидность
function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
} 

//показать ошибку поля
function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__field-error_active');
}

  //скрыть ошибку поля
function hideInputError(formElement, inputElement){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__field-error_active');
  errorElement.textContent = '';
} 

//проверка полей формы на валидность
function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
} 

//изменить состояние кнопки
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save_disabled');
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove('popup__save_disabled');
      buttonElement.removeAttribute('disabled');
    }
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__field-error',
    errorClass: 'popup__field-error_active'
  });