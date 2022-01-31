//все что касается попапа редактирования информации
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_profile-edit');
const popupCloseButton = popup.querySelector('.popup__close');
const popupFormEdit = popup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');//имя в профиле
const profileStatus = document.querySelector('.profile__status'); //статус в профиле
const inputName = popupFormEdit.querySelector('[name = "name"]');//поле формы имя
const inputStatus = popupFormEdit.querySelector('[name = "status"]');//поле формы статус

//все что касается попапа добавления фото
const profileAddButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_image-add');
const addPopupCloseButton = addPopup.querySelector('.popup__close');
const popupFormAdd = addPopup.querySelector('.popup__form');

//кнопка лайк
const pleceLikeButtons = document.querySelectorAll('.place__like');

//зум фото
const zoom = document.querySelector('.popup_type_image-zoom');
const closeZoomButton = zoom.querySelector('.popup__close');





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
    if(this.classList.contains('place__image')) {//условие для открытие увеличенного изображения
        zoom.classList.add('popup_opened');
        zoom.querySelector('.popup__zoom-image').src = this.src;
        zoom.querySelector('.popup__zoom-label').textContent = this.textContent;

    } else if (this.classList.contains('profile__edit-button')){// условие для открытия окна "Редактировать профиль"
        inputName.value = `${profileName.textContent}`;
        inputStatus.value = `${profileStatus.textContent}`;
        popup.classList.add('popup_opened');

    } else if (this.classList.contains('profile__add-button')){// условие для открытия окна "новое место"
        addPopup.classList.add('popup_opened');
    }
}

//функция закрытия попапа редактирования
function closePopup(){
    const popup = document.querySelector('.popup_opened');
    popup.classList.remove('popup_opened');
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
    placeDeleteButton.addEventListener('click', deletePlace);// привязать обработчик удаления
    placeImage.addEventListener('click', openPopup);// привязать зум по нажатию на картинку

    places.prepend(place);
}

//обработчик события внесения изменений в описание профиля
function formEditHandler(evt){
    evt.preventDefault();
    
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
function deletePlace() { 
    let placecls = this.closest('.place');
    placecls.remove();
}

//создание первых 6ти фотокарточек
for(let item of initialCards){
    createPlace(item.name, item.link);
}

profileEditButton.addEventListener('click', openPopup);
profileAddButton.addEventListener('click',openPopup);
popupFormEdit.addEventListener('submit', formEditHandler);
popupFormAdd.addEventListener('submit', formAddHandler);
popupCloseButton.addEventListener('click', closePopup);
closeZoomButton.addEventListener('click', closePopup);
addPopupCloseButton.addEventListener('click',closePopup);