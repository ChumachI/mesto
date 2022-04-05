(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var n=function(){function n(e,r,o){var i=this,u=e.name,s=e.link;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t(this,"_switchLike",(function(){i._likeButton.classList.toggle("place__like_active")})),t(this,"_deletePlace",(function(){i._element.remove(),i._element=null})),this._name=u,this._link=s,this._element=document.querySelector(r).content.querySelector(".place").cloneNode(!0),this._handleCardClick=o,this._likeButton=this._element.querySelector(".place__like"),this._deleteButton=this._element.querySelector(".place__delete"),this._image=this._element.querySelector(".place__image"),this._image.src=this._link,this._image.alt=this._name,this._element.querySelector(".place__name").textContent=this._name,this._setEventListeners()}var r,o;return r=n,(o=[{key:"generateCard",value:function(){return this._element}},{key:"_setEventListeners",value:function(){var e=this;this._likeButton.addEventListener("click",(function(){e._switchLike()})),this._deleteButton.addEventListener("click",(function(){e._deletePlace()})),this._image.addEventListener("click",(function(){e._handleCardClick(e._image)}))}}])&&e(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),n}(),r={formSelector:".popup__form",inputSelector:".popup__field",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_disabled",inputErrorClass:"popup__field-error",errorClass:"popup__field-error_active"};function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settings=t,this._form=document.querySelector(n),this._inputList=Array.from(this._form.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._form.querySelector(this._settings.submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._form.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;this.toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e.toggleButtonState()}))}))}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_showInputError",value:function(e,t){var n=this._form.querySelector(".".concat(e.id,"-error"));n.textContent=t,n.classList.add(this._settings.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._form.querySelector(".".concat(e.id,"-error"));t.classList.remove(this._settings.errorClass),t.textContent=""}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._settings.inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._settings.inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){var n=t.userNameSelector,r=t.userInfoSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(n),this._userInfo=document.querySelector(r)}var t,n;return t=e,n=[{key:"getUserInfo",value:function(){return{userName:this._userName.textContent,userStatus:this._userInfo.textContent}}},{key:"setUserInfo",value:function(e){var t=e.userName,n=e.userInfo;this._userName.textContent=t,this._userInfo.textContent=n}}],n&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keyup",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keyup",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&(document.querySelector(".popup_opened"),this.close())}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__close").addEventListener("click",(function(t){e.close()})),this._popup.addEventListener("mousedown",(function(t){t.stopPropagation(),t.target.classList.contains("popup")&&e.close()}))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},f.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}function _(e,t){return _=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},_(e,t)}function d(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._zoomImage=t._popup.querySelector(".popup__zoom-image"),t._zoomLable=t._popup.querySelector(".popup__zoom-label"),t}return t=u,(n=[{key:"open",value:function(e){this._zoomImage.src=e.src,this._zoomImage.alt=e.alt,this._zoomLable.textContent=e.alt,f(h(u.prototype),"open",this).call(this)}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(c);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=k(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},g.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function w(e,t){return w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},w(e,t)}function S(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._formSubmit=t,n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._popup.querySelectorAll(".popup__field"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;g(E(u.prototype),"setEventListeners",this).call(this),this._form=this._popup.querySelector(".popup__form"),this._form.addEventListener("submit",(function(){e._formSubmit(e._getInputValues())}))}},{key:"close",value:function(){g(E(u.prototype),"close",this).call(this),this._form.reset()}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(c);function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=o,this._container=document.querySelector(n),this._items=r}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),C=document.querySelector(".profile__edit-button"),P=document.querySelector(".profile__add-button"),I=document.querySelector(".popup__field_for_name"),q=document.querySelector(".popup__field_for_status"),B=new s({userNameSelector:".profile__name",userInfoSelector:".profile__status"}),x=new m(".popup_type_image-zoom");x.setEventListeners();var R=new L({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var t=A(e);R.addItem(t.generateCard())}},".places");R.renderItems();var T=new O(".popup_type_profile-edit",(function(e){B.setUserInfo({userName:e.name,userInfo:e.status}),T.close()}));T.setEventListeners();var N=new O(".popup_type_image-add",(function(e){var t=A({name:e.name,link:e.link});R.addItem(t.generateCard()),N.close()}));N.setEventListeners();var V=new i(r,".popup_type_image-add"),z=new i(r,".popup_type_profile-edit");function A(e){return new n(e,"#place",(function(e){x.open(e)}))}V.enableValidation(),z.enableValidation(),C.addEventListener("click",(function(){var e=B.getUserInfo(),t=e.userName,n=e.userStatus;I.value="".concat(t),q.value="".concat(n),z.toggleButtonState(),T.open()})),P.addEventListener("click",(function(){V.toggleButtonState(),N.open()}))})();