import {Card} from './Card.js';
import {initialCards} from './cards.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

//все что касается попапа редактирования информации
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_profile-edit');
const popupCloseButton = popup.querySelector('.popup__close');
const popupFormEdit = popup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');//имя в профиле
const profileStatus = document.querySelector('.profile__status'); //статус в профиле
const inputName = popupFormEdit.querySelector('.popup__field_for_name');//поле формы имя
const inputStatus = popupFormEdit.querySelector('.popup__field_for_status');//поле формы статус

//все что касается попапа добавления фото
const profileAddButton = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_type_image-add');
const popupAddImageCloseButton = popupAddImage.querySelector('.popup__close');
const popupFormAdd = popupAddImage.querySelector('.popup__form');

//валидация форм
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: `popup__field-error`,
    errorClass: 'popup__field-error_active'
}

const addFormValidator = new FormValidator(validationConfig, popupFormAdd);
const editFormVaalidator = new FormValidator(validationConfig, popupFormEdit);
addFormValidator.enableValidation();
editFormVaalidator.enableValidation();

//грид с фотографиями
const places = document.querySelector('.places');

/*ОТКРЫТИЕ ПОПАПОВ*/

//обработчик открытия попапа для редактирования информации
function openEditPopup() {
    inputName.value = `${profileName.textContent}`;
    inputStatus.value = `${profileStatus.textContent}`;
    openPopup(popup);

    const event = new Event('input');
    inputName.dispatchEvent(event);//генерирую событие нажатия клавиши чтобы обновить строку ошибки валидации
    inputStatus.dispatchEvent(event);
}

//обработчик открытия попапа для добавления места
function openAddPopup() {
    openPopup(popupAddImage);
}

/*ЗАКРЫТИЕ ПОПАПОВ*/

//обработчик закрытия попапа для редактирования информации
function closeEditPopup() {
    closePopup(popup);
}

//обработчик закрытия попапа для добавления места 
function closeAddPopup(){
    closePopup(popupAddImage);
    disableSubmitButton(popupAddImage);
}

//"отключить" кнопку сабмита попапа
function disableSubmitButton(popup){
    const button = popup.querySelector('.popup__save');
    button.classList.add('popup__save_disabled');
    button.setAttribute('disabled', true);
}

//закрытие при нажатии на оверлей
function closeOnOverlay(evt) {
    evt.stopPropagation();
    if(evt.target.classList.contains('popup')){
        closePopup(this);
    }
}

function renderCard(name, link) {
    const card = new Card(name, link);
    places.prepend(card.generateCard());
}

//навесить слушателей закрытия на все попапы
function enableExitOnOverlay() {
    const popups = Array.from(document.querySelectorAll('.popup'));

    popups.forEach((popup) =>{
        popup.addEventListener('mousedown',closeOnOverlay);
    });
}

//обработчик события внесения изменений в описание профиля
function executeFormEdit(evt){

    evt.preventDefault();
    
    profileName.textContent = this.name.value;
    profileStatus.textContent = this.status.value;

    closeEditPopup();
}

//обработчик события добавления новой фотографии
function executeFormAdd(evt){
    evt.preventDefault();
    
    const inputName = this.name.value;
    const inputLink = this.link.value;
    renderCard({name: inputName, link: inputLink}, '#place');
    this.name.value = '';
    this.link.value = '';


    closeAddPopup();
}

//создание первых 6ти фотокарточек
for(let item of initialCards){
    renderCard({name: item.name, link: item.link}, '#place');
}

profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click',openAddPopup);

popupFormEdit.addEventListener('submit', executeFormEdit);
popupFormAdd.addEventListener('submit', executeFormAdd);

popupCloseButton.addEventListener('click', closeEditPopup);
popupAddImageCloseButton.addEventListener('click',closeAddPopup);

enableExitOnOverlay();