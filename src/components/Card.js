/*  
образец данных карточки 
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
*/

/*необходимо добавить отображение лайков, для этого требуется использовать массив likes который мы получаем с сервера вместе с данными карточки, 
в данном массиве содержатся пользователи поставивших лайк*/
export default class Card {

    constructor(data, cardTemplateSelector, userId, handleCardClick, handleDelete, handleLike) {
        this._name =  data.name;
        this._link =  data.link;
        this._userId = userId;
        this._element = document.querySelector(cardTemplateSelector).content
        .querySelector('.place').cloneNode(true);
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._handleLike = handleLike;
        this._likeButton = this._element.querySelector('.place__like');
        this._deleteButton = this._element.querySelector('.place__delete');
        this._image = this._element.querySelector('.place__image');
        this._likeCounter = this._element.querySelector('.place__like-counter');//получили счетчик лайков по селектору
        this._likes = data.likes;//массив лайков нам потребуется вне конструктора для поиска в нем id
        this._id = data._id;
        this._ownerId = data.owner._id;
        

        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.place__name').textContent = this._name;
        this._likeCounter.textContent = data.likes.length;//теперь колличество лайков распологаются в разметке
        this._isContainId();//проверяем на наличие моего лайка в загруженной карточке
        this._setEventListeners();
        this._checkCardOwner();

    }

    generateCard() {         
        return this._element;
    }
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', ()=> {this._handleLike()});
        this._deleteButton.addEventListener('click', (evt)=> {
            this._handleDelete(evt);            
        });
        this._image.addEventListener('click', ()=>  {
            this._handleCardClick(this._image);
            
        });
    }

    _deletePlace = () => {
        this._element.remove();
        this._element = null;
    }

    //функция для проверки статуса лайка(установлен или нет)
    //активируется при создании карточек и загрузке их с сервера
    //проверяем наличие моего id  в списке лайков картинки
    //если находим то переключаем цвет кнопки лайка
    _isContainId(){
        //ищем мой id
        const isContain = this._likes.some(item => {
            
                return (item._id === this._userId)
            })
        //если находим переключаем
        if(isContain) {
            this._likeButton.classList.toggle('place__like_active');//
        }
    }
    
    _checkCardOwner(){
        if(this._userId === this._ownerId){
            this._deleteButton.classList.add('place__delete_active')
        }
    }

    getId(){
        return this._id;
    }

    getLikes(){
        return this._likes;
    }

    getLikeCounter(){
        return this._likeCounter;
    }

    getLikeButton(){
        return this._likeButton;
    }

}