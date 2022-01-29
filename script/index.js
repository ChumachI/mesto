

  
const profileEditButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const popupCloseButton = document.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');//имя в профиле
const profileStatus = document.querySelector('.profile__status'); //статус в профиле

const inputName = popupForm.querySelector('[name = "name"]');//поле формы имя
const inputStatus = popupForm.querySelector('[name = "status"]');//поле формы статус



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

function closePopup(){
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt){
    evt.preventDefault();
    profileName = document.querySelector('.profile__name');
    profileStatus = document.querySelector('.profile__status');
    
    let inputName = this.name.value;
    let inputStatus = this.status.value;
    
    profileName.textContent = inputName;
    profileStatus.textContent = inputStatus;
    popup.classList.remove('popup_opened');
}

function createPlace(name, link){
    const places = document.querySelector('.places')
    const placeTemplate = document.querySelector('#place').content;
    const place = placeTemplate.querySelector('.place').cloneNode(true);

    place.querySelector('.place__image').src = link;
    place.querySelector('.place__name').textContent = name;

    places.prepend(place);
}

profileEditButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', formSubmitHandler); 
popupCloseButton.addEventListener('click', closePopup);

for(let item of initialCards){
    createPlace(item.name, item.link);
}