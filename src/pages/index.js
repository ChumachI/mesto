import Card from '../components/Card.js';// generateCard(), конструктор принимет объект с двумя полями (имя карточки и ссылка), шаблон карточки, и обработчик нажатия на картинку
import {initialCards} from '../components/cards.js'; 
import {validationConfig} from '../components/validationConfig.js'
import { FormValidator } from '../components/FormValidator.js';//enableValidation(), конструктор принимает объект настроек и саму проверяемую форму
import UserInfo from '../components/UserInfo.js';// setUserInfo(), getUserInfo(), конструктор принимает объект с двумя полями (селектор имени и селектор поля информации о пользователе)
import PopupWithImage from '../components/PopupWithImage.js';//open(), конструктор принимает картинку
import PopupWithForm from '../components/PopupWithForm.js'; // close(), setEventListeners(), конструктор принимает селектор попапа и обработчик сабмита
import Section from '../components/Section.js';
import {profileAddButton, profileEditButton, inputName, inputStatus} from '../components/constants.js'
import '../pages/index.css';

//класс UserInfo с данными пользователя.
const userInfo = new UserInfo({userNameSelector:'.profile__name', userInfoSelector: '.profile__status'});
//слой section
const section = new Section({items: initialCards, renderer: (item) => {
    
    const card = new Card(item,'#place',()=>{
        new PopupWithImage('.popup_type_image-zoom', card).open();
    });
    return card.generateCard();
}},'.places');

//попап редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_profile-edit',(evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({userName: evt.target.name.value,  userInfo: evt.target.status.value});
    popupEditForm.close();
});

//попап добавления фото
const popupAddForm = new PopupWithForm('.popup_type_image-add',(evt) => {
    evt.preventDefault();
    const inputName = evt.target.name.value;
    const inputLink = evt.target.link.value;
    section.renderItems({name: inputName, link: inputLink});
    evt.target.name.value = '';
    evt.target.link.value = '';
    popupAddForm.close();
});

//активация валидаторов
const addFormValidator = new FormValidator(validationConfig,'.popup_type_image-add');
const editFormVaalidator = new FormValidator(validationConfig,'.popup_type_profile-edit');
addFormValidator.enableValidation();
editFormVaalidator.enableValidation();

//установка слушателя на кнопку редактирования
profileEditButton.addEventListener('click', () => {
    inputName.value = `${userInfo.getUserInfo().userName}`;
    inputStatus.value = `${userInfo.getUserInfo().userInfo}`;
    editFormVaalidator.toggleButtonState();
    popupEditForm.open();
});

//установка слушателя на кнопку добавления карточки
profileAddButton.addEventListener('click', () => {
    popupAddForm.open();
});