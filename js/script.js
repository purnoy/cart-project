const collectionElm = document.querySelector('.collection');
const nameElm = document.querySelector('.product-name');
const priceElm = document.querySelector('.product-price');
const form = document.querySelector('form');
const msgElm = document.querySelector('.msg');
const editElm = document.querySelector('.edit-btn');
const deleteElm = document.querySelector('.delete-btn');

let products = [];

//Show Products to UI
const showProducts = (product) =>{
    const {id, name, price} = product;
    const showingProduct =
    `
        <div class="d-flex align-items-center justify-content-between product" data-productid="${id}">
            <div class=" product d-flex align-items-center justify-content-between w-75 my-2">
                <p class="w-50 text-center py-1  bg-success text-light">${id}</p>
                <p class="w-50 text-center py-1 ">-</p>    
                <p class="w-50 text-center py-1  bg-success text-light">${name}</p>
                <p class="w-50 text-center py-1 ">-</p>                    
                <p class="w-50 text-center py-1  bg-success text-light">${price}</p>
            </div>
            <div class="d-flex align-items-center justify-content-end w-25 my-4">
                <i class="edit-btn fa-solid fa-pen-to-square fa-lg mx-2"></i>
                <i class="delete-btn fa-solid fa-trash fa-lg mx-2"></i>
            </div>
        </div>
    `;
    collectionElm.insertAdjacentHTML('beforeend',showingProduct);
};
//Product strorage
const  productStrore = (name,price) =>{
    const product = {
        id: products.length+1,
        name,
        price
    }
    products.push(product);
    return product;
};

//Neutralize the input fields
const neutralize = () =>{
    nameElm.value = '';
    priceElm.value = '';
};
//Texting Removng
const removeText = () =>{
    msgElm.innerHTML = '';
}
//Showing Message
const showMessage = (textMsg, action='') =>{
    const mElm = 
    `<div class="bg-${action} d-flex align-items-center justify-content-center">
            <p class="py-2 text-light">${textMsg}</p>
        </div>
    `;
    msgElm.insertAdjacentHTML('afterbegin', mElm);
    setTimeout(removeText, 3000);
}
//Input Validation
const inputValidation = (name,price) =>{
    if(name == '' || price == ''){
        showMessage('Name or Price can not be empty', 'danger');
        return false;
    }
    else if(!(Number(name)!==Number(name))){
        showMessage('Name can not number', 'danger');
        return false;
    }
    else if(Number(price)!==Number(price)){
        showMessage('Price can not be String', 'danger');
        return false;
    }
    else{
        showMessage('Product added successfully', 'success');
        return true;
    }
}
//Geeting Input from User
const getInput = () =>{
    const name = nameElm.value;
    const price = priceElm.value;
    return {name, price};
}
//Handling input from user
const handleInput = (e) =>{
    e.preventDefault();
    //Getting Input from user(Function Call);
    const {name,price} = getInput();
    console.log(name,price);
    //Validating Input
    const isValidate = inputValidation(name,price);
    if(!isValidate){return;}
    //Neutralize the input fields
    neutralize();
    //Product strorage
    const product = productStrore(name,price);
    //Show Products to UI
    showProducts(product);
}
//Removing Product from UI
const removingProductFromUI = id =>{
    document.querySelector(`[data-productid="${id}"]`).remove();
    showMessage('Product Removed Successfully', 'info');
}
//Removing Product from Product List
 const removingProductfromproductlist = (id) =>{
    products=products.filter(product=>product.id!==id);
    console.log(products);
 }
//Getting product id
const productIDfinder = (evt) =>{
        const productElm = evt.target.parentElement.parentElement;
        const productID = Number(productElm.getAttribute('data-productid'));
        return productID;
}
//Product Modification
const modifyingProduct = (evt) =>{
    if(evt.target.classList.contains('delete-btn')){
        const id = productIDfinder(evt);
        removingProductfromproductlist(id);
        removingProductFromUI(id);
    }
    
}
form.addEventListener('submit',handleInput);
collectionElm.addEventListener('click', modifyingProduct);
