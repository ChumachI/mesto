import Card from '../components/Card.js';// generateCard(), конструктор принимет объект с двумя полями (имя карточки и ссылка), шаблон карточки, и обработчик нажатия на картинку
import {initialCards} from '../components/cards.js'; 
import {validationConfig} from '../components/validationConfig.js'
import { FormValidator } from '../components/FormValidator.js';//enableValidation(), конструктор принимает объект настроек и саму проверяемую форму
import UserInfo from '../components/UserInfo.js';// setUserInfo(), getUserInfo(), конструктор принимает объект с двумя полями (селектор имени и селектор поля информации о пользователе)
import PopupWithImage from '../components/PopupWithImage.js';//open(), конструктор принимает картинку
import PopupWithForm from '../components/PopupWithForm.js'; // close(), setEventListeners(), конструктор принимает селектор попапа и обработчик сабмита
import Section from '../components/Section.js';
import {profileAddButton, profileEditButton, inputName, inputStatus} from '../components/utils/constants.js'
import '../pages/index.css';

//класс UserInfo с данными пользователя.
const userInfo = new UserInfo({userNameSelector:'.profile__name', userInfoSelector: '.profile__status'});
const popupWithImage = new PopupWithImage('.popup_type_image-zoom');
popupWithImage.setEventListeners();
//слой section
const section = new Section({items: initialCards, renderer: (item) => {
    const card = createCard(item);
    section.addItem(card.generateCard());
}},'.places');
section.renderItems();

//попап редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_profile-edit',(formValues) => {
    userInfo.setUserInfo({userName: formValues.name,  userInfo: formValues.status});
    popupEditForm.close();
});
popupEditForm.setEventListeners();

//попап добавления фото
const popupAddForm = new PopupWithForm('.popup_type_image-add',(formValues) => {
    const inputName = formValues.name;
    const inputLink = formValues.link;
    const card = createCard({name: inputName, link: inputLink})
    section.addItem(card.generateCard());
    popupAddForm.close();
});
popupAddForm.setEventListeners();

//активация валидаторов
const formAddValidator = new FormValidator(validationConfig,'.popup_type_image-add');
const formEditValidator = new FormValidator(validationConfig,'.popup_type_profile-edit');
formAddValidator.enableValidation();
formEditValidator.enableValidation();

//установка слушателя на кнопку редактирования
profileEditButton.addEventListener('click', () => {
    const {userName, userStatus} = userInfo.getUserInfo();
    inputName.value = `${userName}`;
    inputStatus.value = `${userStatus}`;
    formEditValidator.toggleButtonState();
    popupEditForm.open();
});

//установка слушателя на кнопку добавления карточки
profileAddButton.addEventListener('click', () => {
    formAddValidator.toggleButtonState();
    popupAddForm.open();
});

function createCard(item){
    const card = new Card(item,'#place',(image)=>{
        popupWithImage.open(image);
    });
    return card;
}