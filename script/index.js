let profileEditButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupCloseButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');//имя в профиле
let profileStatus = document.querySelector('.profile__status'); //статус в профиле

let inputName = popupForm.querySelector('[name = "name"]');//поле формы имя
let inputStatus = popupForm.querySelector('[name = "status"]');//поле формы статус


function popupEdit(){
    popup.classList.add('popup_opened');
    inputName.value = `${profileName.textContent}`;
    inputStatus.value = `${profileStatus.textContent}`;
}

function popupClose(){
    popup.classList.remove('popup_opened');
    inputName.value = `${profileName.textContent}`;
    inputStatus.value = `${profileStatus.textContent}`;
}

function formSubmitHandler(evt){
    evt.preventDefault();
    popup.classList.remove('popup_opened');
    profileName = document.querySelector('.profile__name');
    profileStatus = document.querySelector('.profile__status');
    
    let inputName = this.name.value;
    let inputStatus = this.status.value;
    
    profileName.textContent = inputName;
    profileStatus.textContent = inputStatus;
}


profileEditButton.addEventListener('click', popupEdit);
popupForm.addEventListener('submit', formSubmitHandler); 
popupCloseButton.addEventListener('click', popupClose);