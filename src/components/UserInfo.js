/**Класс UserInfo отвечает за управление отображением информации о пользователе на странице. 
 * Этот класс: Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.*/
export default class UserInfo {
    constructor({userNameSelector, userInfoSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    /*Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.*/
    getUserInfo() {
        return {userName: this._userName.textContent, userStatus: this._userInfo.textContent};
    }

    /* Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу. */
    setUserInfo({userName, userInfo}){
        this._userName.textContent = userName;
        this._userInfo.textContent = userInfo;
    }
}