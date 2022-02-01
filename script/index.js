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

//зум фото
const zoom = document.querySelector('.popup_type_image-zoom');
const zoomImage = zoom.querySelector('.popup__zoom-image');
const zoomLable = zoom.querySelector('.popup__zoom-label');
const closeZoomButton = zoom.querySelector('.popup__close');

//грид с фотографиями
const places = document.querySelector('.places');





//функция открытия попапа общая
function openPopup(popup){
    popup.classList.add('popup_opened');
}

//обработчик открытия попапа для редактирования информации
function openEditPopup() {
    inputName.value = `${profileName.textContent}`;
    inputStatus.value = `${profileStatus.textContent}`;
    openPopup(popup);
}

//обработчик открытия попапа для добавления места
function openAddPopup() {
    openPopup(popupAddImage);
}

//обработчик открытия попапа зума картинки
function openZoomPopup() {
    zoomImage.src = this.src;
    zoomImage.alt = this.alt;
    zoomLable.textContent = this.alt;
    openPopup(zoom);
}





//функция закрытия попапа общая
function closePopup(popup){
    popup.classList.remove('popup_opened');
}

//обработчик закрытия попапа для редактирования информации
function closeEditPopup() {
    closePopup(popup);
}

//обработчик закрытия попапа для добавления места 
function closeAddPopup(){
    closePopup(popupAddImage);
}

//обработчик закрытия попапа зума картинки 
function closeZoomPopup() {
    closePopup(zoom);
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
    placeImage.addEventListener('click', openZoomPopup);// привязать зум по нажатию на картинку

    return place;
}

function renderCard(name, link) {
    const place = createPlace(name, link);
    places.prepend(place);
}




//обработчик события внесения изменений в описание профиля
function formEditHandler(evt){
    evt.preventDefault();
    
    profileName.textContent = this.name.value;
    profileStatus.textContent = this.status.value;

    closeEditPopup();
}

//обработчик события добавления новой фотографии
function formAddHandler(evt){
    evt.preventDefault();
    
    const inputName = this.name.value;
    const inputLink = this.link.value;
    renderCard(inputName, inputLink);
    this.name.value = '';
    this.link.value = '';

    closeAddPopup();
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

profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click',openAddPopup);

popupFormEdit.addEventListener('submit', formEditHandler);
popupFormAdd.addEventListener('submit', formAddHandler);

popupCloseButton.addEventListener('click', closeEditPopup);
closeZoomButton.addEventListener('click', closeZoomPopup);
popupAddImageCloseButton.addEventListener('click',closeAddPopup);