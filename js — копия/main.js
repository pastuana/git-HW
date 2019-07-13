

//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
//список товаров
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

//Глобальные сущности
var list = fetchData ();
var userCart = [];

document.querySelector ('.btn-cart').addEventListener ('click', () => {
    document.querySelector ('.cart-block').classList.toggle ('invisible')
})

//querySelector возвращает первый элемент соответсвующий селектору btn cart
//addEventListener  - event
// Имя события, например click
// handler
// Ссылка на функцию, которую надо поставить обработчиком.
// phase
// Необязательный аргумент, «фаза», на которой обработчик должен сработать.
// toggle - Метод toggle добавляет класс, если его нет, удаляет если есть:


document.querySelector ('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct (evt.target);
    }
})
// при нажатии на кнопку купить добавитс в корзину
//Метод contains проверяет наличие указанного класса (возвращает true, если такой класс есть у элемента,
// false - если нет):

//Удаление объекта из корзины - пока не нужуно
/*
document.querySelector ('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        removeProduct (evt.target);
    }
})
*/
// Если происходит нажатие на кнокпку удалить у объекта в корзине, вызывается фукнция удаления из корзины.

function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push (createProduct (i));
    }
    return arr
}

function createProduct (i) {
    return {
        id: i,
        name: items[i],
        price: prices[i],
        img: image,
        quantity: 0,
        createTemplate: function () {
            return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id}"
                            data-name="${this.name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
        }
    }
}

function renderProducts () {
    let arr = [];
    for (item of list) {
        arr.push (item.createTemplate ())
    }
    document.querySelector ('.products').innerHTML = arr.join ();
}
//Свойство Element.innerHTML устанавливает или получает разметку дочерних элементов.
//Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.

renderProducts ();


//CART
function addProduct (product) {
    let productId = +product.dataset['id'];
    //Стандарт HTML5 специально разрешает атрибуты data-* и резервирует их для пользовательских данных.
    //
    // При этом во всех браузерах, кроме IE10-, к таким атрибутам можно обратиться не только как к атрибутам,
    // но и как к свойствам, при помощи специального свойства dataset:
    let find = userCart.find (element => element.id === productId)
    //либо find = userCart [?] (obj) || false

    if (!find) {
        userCart.push ({
            name: product.dataset['name'],
            id: productId,
            img: cartImage,
            price: +product.dataset['price'],
            quantity: 1
        })
    } else {
        find.quantity++
    }
    renderCart ();
}

//Функция удаления из корзины - пока не нужно
/*
function removeProduct (product) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId)
    //либо find = userCart [?] (obj) || false

    if (find.quantity > 1) {
        find.quantity--
    } else {
        userCart.splice (userCart.indexOf(find), 1);
        document.querySelector (`.cart-item[data-id="${productId}"]`).remove ()
    }
    renderCart ();
}*/


function renderCart () {
    let allProducts = '';
    for (item of userCart) {
        allProducts += `<div class="cart-item" data-id="${item.id}">
                            <div class="product-bio">
                                <img src="${item.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${item.name}</p>
                                    <p class="product-quantity">Quantity: ${item.quantity}</p>
                                    <p class="product-single-price">$${item.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${item.quantity * item.price}</p>
                                <button class="del-btn" data-id="${item.id}">&times;</button>
                            </div>
                        </div>`
    }
    document.querySelector ('.cart-block').innerHTML = allProducts;
}
