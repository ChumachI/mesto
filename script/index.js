let profileEditButton = document.querySelector('.profile__edit-button');

let popupClose = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup__form');
let popupSave = document.querySelector('.popup__save');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');//имя в профиле
let profileStatus = document.querySelector('.profile__status'); //статус в профиле

let inputName = popupForm.querySelector('[name = "name"]');//поле формы имя
let inputStatus = popupForm.querySelector('[name = "status"]');//поле формы статус

profileEditButton.addEventListener('click',function(){
    popup.style = 'display: flex';
    inputName.setAttribute('value',`${profileName.textContent}`);
    inputStatus.setAttribute('value', `${profileStatus.textContent}`);
});

popupClose.addEventListener('click',function(){
    popup.style = 'display: none';
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    popup.style = 'display: none';
    profileName = document.querySelector('.profile__name');
    profileStatus = document.querySelector('.profile__status');
    
    let inputName = this.name.value;
    let inputStatus = this.status.value;
    
    profileName.textContent = inputName;
    profileStatus.textContent = inputStatus;

}

popupForm.addEventListener('submit', formSubmitHandler); 