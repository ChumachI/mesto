export default class Api {
    constructor(options) {
        this._commonUrlPart = options.commonUrlPart;
        this._headers = options.headers;
    }

    _checkResult(result) {
        if (result.ok) {
          return result.json();
        }
        else {
         return Promise.reject(`Ошибка: ${result.status}`);
        } 
    }
    //загружаем карточки с сервера
    getInitialCards() {
        return fetch(`${this._commonUrlPart}/cards`, {
          headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

    //получаем информацию о пользователе
    getUserInfo(){
        return fetch(`${this._commonUrlPart}/users/me`, {
            headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

    //вносим изменения в информацию о пользователе
    setProfileInfo(userName, userInfo){
        return fetch(`${this._commonUrlPart}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${userName}`,
                about: `${userInfo}`
            }),  
        })
        .then(result => this._checkResult(result))
    }

    postNewCard({cardName, inputLink}){
        return fetch(`${this._commonUrlPart}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name : cardName,
                link : inputLink,
            })
        })
        .then(result => this._checkResult(result))
    }

    setLike(id){
        return fetch(`${this._commonUrlPart}/cards/${id}/likes`,{
            method: 'PUT',
            headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

    deleteLike(id){
        return fetch(`${this._commonUrlPart}/cards/${id}/likes`,{
            method: 'DELETE',
            headers: this._headers
        })
        .then(result => this._checkResult(result))
    }
    getCardLikes(id){
        
        return fetch(`${this._commonUrlPart}/cards/${id}/likes`,{
            method: 'GET',
            headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

    deleteCard(id){
        if(!id) return;
        return fetch(`${this._commonUrlPart}/cards/${id}`,{
            method: 'DELETE',
            headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

    setAvatar(link){
        return fetch(`${this._commonUrlPart}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(result => this._checkResult(result))
    }
}