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
const addPopup = document.querySelector('.popup_type_image-add');
const addPopupCloseButton = addPopup.querySelector('.popup__close');
const popupFormAdd = addPopup.querySelector('.popup__form');

//кнопка лайк
const pleceLikeButtons = document.querySelectorAll('.place__like');

//зум фото
const zoom = document.querySelector('.popup_type_image-zoom');
const zoomImage = zoom.querySelector('.popup__zoom-image');
const zoomLable = zoom.querySelector('.popup__zoom-label');
const closeZoomButton = zoom.querySelector('.popup__close');


//функция открытия попапа
function openPopup(){
    if(this.classList.contains('place__image')) {//условие для открытие увеличенного изображения
        zoom.classList.add('popup_opened');
        zoomImage.src = this.src;
        zoomImage.alt = this.alt
        zoomLable.textContent = this.alt;

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
    const popup = document.querySelector('.popup_opened');//считаю такой вариант наиболее компактным, но если требуется развернуть в конструкцию if то могу переделать.
    popup.classList.remove('popup_opened');
}

//функция создания нового фото
function createPlace(name, link){
    const placeTemplate = document.querySelector('#place').content;
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    const placeLikeButton = place.querySelector('.place__like');
    const placeDeleteButton = place.querySelector('.place__delete');
    const placeImage = place.querySelector('.place__image');

    place.querySelector('.place__image').src = link;
    place.querySelector('.place__name').textContent = name;
    placeImage.alt = name;

    placeLikeButton.addEventListener('click', placeLike);// привязать обработчик кнопки лайк
    placeDeleteButton.addEventListener('click', deletePlace);// привязать обработчик удаления
    placeImage.addEventListener('click', openPopup);// привязать зум по нажатию на картинку

    return place;
}

function renderCard(name, link) {
    const place = createPlace(name, link);
    const places = document.querySelector('.places');
    places.prepend(place);
}

//обработчик события внесения изменений в описание профиля
function formEditHandler(evt){
    evt.preventDefault();
    
    profileName.textContent = this.name.value;
    profileStatus.textContent = this.status.value;

    closePopup();
}

//обработчик события добавления новой фотографии
function formAddHandler(evt){
    evt.preventDefault();
    
    const inputName = this.name.value;
    const inputLink = this.link.value;
    renderCard(inputName, inputLink);
    this.name.value = '';
    this.link.value = '';

    closePopup();
}

//обработчик лайков
function placeLike(){ 
    this.classList.toggle('place__like_active');
}

//обработчик удаления фото
function deletePlace() { 
    const placecls = this.closest('.place');
    placecls.remove();
}

//создание первых 6ти фотокарточек
for(let item of initialCards){
    renderCard(item.name, item.link);
}

profileEditButton.addEventListener('click', openPopup);
profileAddButton.addEventListener('click',openPopup);
popupFormEdit.addEventListener('submit', formEditHandler);
popupFormAdd.addEventListener('submit', formAddHandler);
popupCloseButton.addEventListener('click', closePopup);
closeZoomButton.addEventListener('click', closePopup);
addPopupCloseButton.addEventListener('click',closePopup);