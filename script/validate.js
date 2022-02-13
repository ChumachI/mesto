//Включить валидацию
function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      setEventListeners(formElement, settings);
    });
}

//установка слушателей на поля
function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
} 

//проверка поля на валидность
function isValid(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
} 

//показать ошибку поля
function showInputError(formElement, inputElement, errorMessage, settings){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

  //скрыть ошибку поля
function hideInputError(formElement, inputElement, settings){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
} 

//проверка полей формы на валидность
function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
} 

//изменить состояние кнопки
function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
      console.log('кнопка установлена в неактивное состояние');
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
      console.log('кнопка установлена в активное состояние');
    }
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: `popup__field-error`,
    errorClass: 'popup__field-error_active'
  });