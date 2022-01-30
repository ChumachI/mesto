//все что касается попапа редактирования информации
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const popupFormEdit = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');//имя в профиле
let profileStatus = document.querySelector('.profile__status'); //статус в профиле
const inputName = popupFormEdit.querySelector('[name = "name"]');//поле формы имя
const inputStatus = popupFormEdit.querySelector('[name = "status"]');//поле формы статус

//все что касается попапа добавления фото
const profileAddButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.add-popup');
const addPopupCloseButton = document.querySelector('.add-popup__close');
const popupFormAdd = document.querySelector('.add-popup__form');

//кнопка лайк
const pleceLikeButtons = document.querySelectorAll('.place__like');

//зум фото
const zoom = document.querySelector('.zoom');
const closeZoomButton = document.querySelector('.zoom__close');





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

//функция открытия попапа редактирования
function openPopup(){
    inputName.value = `${profileName.textContent}`;
    inputStatus.value = `${profileStatus.textContent}`;
    popup.classList.add('popup_opened');
}

//функция закрытия попапа редактирования
function closePopup(){
    popup.classList.remove('popup_opened');
}

//открытие попапа для добавления фото:
function openAddPopup() {
    addPopup.classList.add('add-popup_opened');
    console.log(addPopup.classList);
}

//закрытие попапа для добавления фото:
function closeAddPopup(){
    addPopup.classList.remove('add-popup_opened');
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
    
    const inputName = this.name.value;
    const inputStatus = this.status.value;
    
    profileName.textContent = inputName;
    profileStatus.textContent = inputStatus;
    closePopup();
}

//обработчик события добавления новой фотографии
function formAddHandler(evt){
    evt.preventDefault();
    
    const inputName = this.name.value;
    const inputLink = this.link.value;
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
    const placecls = this.closest('.place');//находим родительский блок
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

profileEditButton.addEventListener('click', openPopup);
profileAddButton.addEventListener('click',openAddPopup);
popupFormEdit.addEventListener('submit', formEditHandler);
popupFormAdd.addEventListener('submit', formAddHandler);
popupCloseButton.addEventListener('click', closePopup);
closeZoomButton.addEventListener('click', closeImagePopup);
addPopupCloseButton.addEventListener('click',closeAddPopup);