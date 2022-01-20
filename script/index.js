let profileEditButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupCloseButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');//имя в профиле
let profileStatus = document.querySelector('.profile__status'); //статус в профиле

let inputName = popupForm.querySelector('[name = "name"]');//поле формы имя
let inputStatus = popupForm.querySelector('[name = "status"]');//поле формы статус


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


profileEditButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', formSubmitHandler); 
popupCloseButton.addEventListener('click', closePopup);