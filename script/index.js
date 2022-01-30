const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
let popupFormEdit = document.querySelector('#popup__form-edit');
let popupFormAdd = document.querySelector('#popup__form-add');
const popupCloseButton = document.querySelector('.popup__close');
const closeZoomButton = document.querySelector('.zoom__close');
let pleceLikeButtons = document.querySelectorAll('.place__like');
const zoom = document.querySelector('.zoom');

let profileName = document.querySelector('.profile__name');//имя в профиле
let profileStatus = document.querySelector('.profile__status'); //статус в профиле

const inputName = popupFormEdit.querySelector('[name = "name"]');//поле формы имя
const inputStatus = popupFormEdit.querySelector('[name = "status"]');//поле формы статус

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//функция открытия попапа общая
function openPopup(){
    inputName.value = `${profileName.textContent}`;
    inputStatus.value = `${profileStatus.textContent}`;
    popup.classList.add('popup_opened');
}
//функция открытия попапа для редактирования данных
function editPopup(){
    popup.querySelector('.popup__header').textContent = 'Редактировать профиль';
    popupFormEdit.classList.add('popup__form_active');
    openPopup();
}
//функция открытия попапа для добавления фото
function addPopup(){
    popup.querySelector('.popup__header').textContent = 'Новое место';
    popupFormAdd.classList.add('popup__form_active');
    openPopup();
}
//функция закрытия попапа
function closePopup(){
    popup.classList.remove('popup_opened');
    popupFormAdd.classList.remove('popup__form_active');
    popupFormEdit.classList.remove('popup__form_active');
}
//функция создания нового фото
function createPlace(name, link){
    const places = document.querySelector('.places');
    const placeTemplate = document.querySelector('#place').content;
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    const placeLikeButton = place.querySelector('.place__like');
    const placeDeleteButton = place.querySelector('.place__delete');
    const placeImage = place.querySelector('.place__image');

    place.querySelector('.place__image').src = link;
    place.querySelector('.place__name').textContent = name;

    placeLikeButton.addEventListener('click', placeLike);// привязать обработчик кнопки лайк
    placeDeleteButton.addEventListener('click', placeDelete);// привязать обработчик удаления
    placeImage.addEventListener('click', openImagePopup);

    places.prepend(place);
}
//обработчик события внесения изменений в описание профиля
function formEditHandler(evt){
    evt.preventDefault();
    profileName = document.querySelector('.profile__name');
    profileStatus = document.querySelector('.profile__status');
    
    let inputName = this.name.value;
    let inputStatus = this.status.value;
    
    profileName.textContent = inputName;
    profileStatus.textContent = inputStatus;
    closePopup();
}
//обработчик события добавления новой фотографии
function formAddHandler(evt){
    evt.preventDefault();
    
    let inputName = this.name.value;
    let inputLink = this.link.value;
    createPlace(inputName, inputLink);
    this.name.value = '';
    this.link.value = '';
    closePopup();
}
//обработчик лайков
function placeLike(){ 
    if(this.classList.contains('place__like_active')){
        this.classList.remove('place__like_active');
    }
    else{
        this.classList.add('place__like_active');
    }
}
//обработчик удаления фото
function placeDelete() { 
    let placecls = this.closest('.place');
    placecls.remove();
}
//открытие зума для просмотра фото
function openImagePopup() {
    let placecls = this.closest('.place');//находим родительский блок
    zoom.classList.add('zoom_active');
    zoom.querySelector('.zoom__image').src = this.closest('.place__image').src;
    zoom.querySelector('.zoom__label').textContent = placecls.querySelector('.place__name').textContent;// с помощью родительского блока находим название 
}
//закрытие зума
function closeImagePopup(){
    zoom.classList.remove('zoom_active');
}
//создание первых 6ти фотокарточек
for(let item of initialCards){
    createPlace(item.name, item.link);
}

profileEditButton.addEventListener('click', editPopup);
profileAddButton.addEventListener('click',addPopup);
popupFormEdit.addEventListener('submit', formEditHandler);
popupFormAdd.addEventListener('submit', formAddHandler);
popupCloseButton.addEventListener('click', closePopup);
closeZoomButton.addEventListener('click', closeImagePopup);