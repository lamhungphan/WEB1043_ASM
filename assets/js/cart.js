let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let totalPriceElement = document.getElementById('totalPrice');
let cart = [];
let products = [];

function showCart() {
    var x = document.getElementById("show-cart")
    if (x.style.display == "none" || x.style.display === "") {
        x.style.display = "block"
    } else {
        x.style.display = 'none'
    }
}

const addDataToHTML = () => {
    // add new datas
    if (products.length > 0) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">${formatPrice(product.price)}đ</div>
                <button class="addCart">Mua ngay</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let subTotalPrice = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            let itemSubTotal = info.price * item.quantity;
            subTotalPrice += itemSubTotal;
            listCartHTML.appendChild(newItem);

            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="subTotalPrice">${formatPrice(itemSubTotal)}đ</div>
                <div class="quantity">
                    <span class="minus">&#10094</span>
                    <span>${item.quantity}</span>
                    <span class="plus">&#10095</span>
                </div>
                <button class="delete">Xoá</button> 
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
    totalPriceElement.innerText = `Tổng: ${formatPrice(subTotalPrice)}đ`;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        // let product_id = positionClick.parentElement.parentElement.dataset.id;
        let product_id = positionClick.closest('.item').dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        } else if (positionClick.classList.contains('delete')) {
            type = 'delete';
        }
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            case 'delete':
                cart.splice(positionItemInCart, 1);
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const initApp = () => {
    // get data product
    fetch('/assets/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            // get data cart from memory
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
};
initApp();