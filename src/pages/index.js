import Card from '../components/Card.js';// generateCard(), конструктор принимет объект с двумя полями (имя карточки и ссылка), шаблон карточки, и обработчик нажатия на картинку
import {validationConfig} from '../utils/validationConfig.js'
import { FormValidator } from '../components/FormValidator.js';//enableValidation(), конструктор принимает объект настроек и саму проверяемую форму
import UserInfo from '../components/UserInfo.js';// setUserInfo(), getUserInfo(), конструктор принимает объект с двумя полями (селектор имени и селектор поля информации о пользователе)
import PopupWithImage from '../components/PopupWithImage.js';//open(), конструктор принимает картинку
import PopupWithForm from '../components/PopupWithForm.js'; // close(), setEventListeners(), конструктор принимает селектор попапа и обработчик сабмита
import PopupCardDelete from '../components/PopupCardDelete.js'; //создал спец класс для попапа удаления карточек
import Section from '../components/Section.js';
import {profileAddButton, profileEditButton, avatarEditButton, inputName, inputStatus} from '../utils/constants.js'
import { ApiConfig } from '../utils/ApiConfig.js';
import Api from '../components/Api.js';
import '../pages/index.css';




//объект UserInfo с данными пользователя.
const userInfo = new UserInfo({userNameSelector:'.profile__name', userInfoSelector: '.profile__status', avatarSelector: '.profile__avatar'});
const popupWithImage = new PopupWithImage('.popup_type_image-zoom');
popupWithImage.setEventListeners();



const popupAvatarEdit = new PopupWithForm('.popup_type_avatar-edit', (formValues) => {
    popupAvatarEdit.renderLoading('Сохранение...');
    const inputLink = formValues.link;
    api.setAvatar(inputLink)
    .then(() => {
        userInfo.setAvatar(inputLink);
    })
    .then(()=>{
        popupAvatarEdit.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(()=>{
        popupAvatarEdit.renderLoading('Сохранить');
    })
    
});
popupAvatarEdit.setEventListeners();



//объект section
const section = new Section({ renderer: (item) => {
    const card = createCard(item);
    section.addItem(card.generateCard());
}},'.places');





//создаем объект Api
const api = new Api(ApiConfig);
/*далее запускаем процесс загрузки странички, в конце загрузки страница появится на экране без "дерганий"*/
//первым делом необходимо получить данные пользователя
api.getUserInfo()
.then(res => {
    userInfo.setUserInfo({userName: res.name, userInfo: res.about, userId: res._id});
    userInfo.setAvatar(res.avatar);
})
.then(() => {
    //загружаем карточки с сервера
    return api.getInitialCards()
})
.then((res)=>{
    //при добавлении карточки на сервер она добавляется в конец массива. 
    //для корректного отображения порядка карточек на сайте массив карточек требуется развернуть в обратном порядке.
    res = res.reverse();
    section.renderItems(res);
})
.then(()=>{
    //документ появится на странице только после загрузки аватара, данных пользователя и карточек.
    //от себя добавил transition, чтобы проявление было плавным, как и все появления на сайте - попапы, зумы и т д.
    document.querySelector('.page').classList.add('page_loaded');
})
.catch((err) => {
    console.log(err);
})




//попап редактирования профиля
const popupEditForm = new PopupWithForm('.popup_type_profile-edit',(formValues) => {
    popupEditForm.renderLoading('Сохранение...');
    
    api.setProfileInfo(formValues.name, formValues.status)
    .then(()=>{
        popupEditForm.close();
        userInfo.setUserInfo({userName: formValues.name,  userInfo: formValues.status});
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(()=>{
        
        popupEditForm.renderLoading('Сохранить');
    })
    
});
popupEditForm.setEventListeners();

//попап перед удалением картинки
const popupDeleteCard = new PopupCardDelete('.popup_type_image-delete')
popupDeleteCard.setEventListeners();






//попап добавления фото > в параметрах селектор попапа, и колбек сабмита формы.
//колбек принимает данные полученные из формы > извлекает из этих данных название и ссылку >
//передает название и ссылку в функцию createCard(расположена в этом же файле) >
//результат функции, новая карточка, вносится в переменную card > 
//метод generateCard возвращает готовую заполненную разметку карточки и передает ее методу addItem объекта section для отрисовки
//после обработки сабмита попап закрывается
/*здесь я распологаю запрос в API по передаче данных карточки на сервер*/
const popupAddForm = new PopupWithForm('.popup_type_image-add',(formValues) => {
    popupAddForm.renderLoading('Сохранение...');
    const inputName = formValues.name;
    const inputLink = formValues.link;
    api.postNewCard({cardName: inputName, inputLink: inputLink})
    .then(data => {
        const card = createCard(data);
        section.addItem(card.generateCard());
    })
    .then(()=>{
        popupAddForm.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(()=>{
        popupAddForm.renderLoading('Создать');
    })
    
    
    
});
popupAddForm.setEventListeners();

//активация валидаторов
const formAddValidator = new FormValidator(validationConfig,'.popup_type_image-add');
const formEditValidator = new FormValidator(validationConfig,'.popup_type_profile-edit');
const formAvatarEdit = new FormValidator(validationConfig,'.popup_type_avatar-edit');
formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarEdit.enableValidation();

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

avatarEditButton.addEventListener('click', () => {
    formAvatarEdit.toggleButtonState();
    popupAvatarEdit.open();
})

function createCard(data){
    const card = new Card(
        data,

        '#place',

        userInfo.getUserInfo().userId,

        api,

        (image)=>{
            popupWithImage.open(image);
        },

        (evt)=> {
            const cardElement = evt.target.closest('.place');
            const cardId = card.getId();
            popupDeleteCard.open();
            popupDeleteCard.setsubmitHandler((evt)=>{
                api.deleteCard(cardId)
                .then(() => {
                    cardElement.remove();
                })
                .then(()=>{
                    popupDeleteCard.close();
                })
                .catch((err) => {
                    console.error(err);
                });
            });
            popupDeleteCard.open();
        },


    );
    return card;
}



/*было трудно, но очень круто*/