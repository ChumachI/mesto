const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
let popupFormEdit = document.querySelector('#popup__form-edit');
let popupFormAdd = document.querySelector('#popup__form-add');
const popupCloseButton = document.querySelector('.popup__close');
let pleceLikeButtons = document.querySelectorAll('.place__like');

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

function openPopup(){
    inputName.value = `${profileName.textContent}`;
    inputStatus.value = `${profileStatus.textContent}`;
    popup.classList.add('popup_opened');
}

function editPopup(){
    popup.querySelector('.popup__header').textContent = 'Редактировать профиль';
    popupFormEdit.classList.add('popup__form_active');
    openPopup();
}

function addPopup(){
    popup.querySelector('.popup__header').textContent = 'Новое место';
    popupFormAdd.classList.add('popup__form_active');
    openPopup();
}

function closePopup(){
    popup.classList.remove('popup_opened');
    popupFormAdd.classList.remove('popup__form_active');
    popupFormEdit.classList.remove('popup__form_active');
}

function createPlace(name, link){
    const places = document.querySelector('.places')
    const placeTemplate = document.querySelector('#place').content;
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    const placeLikeButton = place.querySelector('.place__like');

    place.querySelector('.place__image').src = link;
    place.querySelector('.place__name').textContent = name;
    placeLikeButton.addEventListener('click', placeLike);// привязать обработчик кнопки лайк

    places.prepend(place);
}

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

function formAddHandler(evt){
    evt.preventDefault();
    
    let inputName = this.name.value;
    let inputLink = this.link.value;
    createPlace(inputName, inputLink);
    this.name.value = '';
    this.link.value = '';
    closePopup();
}

function placeLike(evt){ //обработчик лайков
    if(evt.target.classList.contains('place__like_active')){
        evt.target.classList.remove('place__like_active');
    }
    else{
        evt.target.classList.add('place__like_active');
    }
    
}

for(let item of initialCards){
    createPlace(item.name, item.link);

}

profileEditButton.addEventListener('click', editPopup);
profileAddButton.addEventListener('click',addPopup);
popupFormEdit.addEventListener('submit', formEditHandler);
popupFormAdd.addEventListener('submit', formAddHandler);
popupCloseButton.addEventListener('click', closePopup);