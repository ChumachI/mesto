/**Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:
Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. 
Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. 
Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
 */
export default class Section {
    constructor({items,renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._items = items;

    }
    /*Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer. */
    renderItems() {
        this._items.forEach( element => {
            this._renderer(element);
        });
    }
    /*Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер. */
    addItem(DOMitem) {
        this._container.prepend(DOMitem);
    }
}