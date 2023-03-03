const form = document.querySelector('form');
const productName = document.querySelector('.product-name');
const productPrice = document.querySelector('.product-price');
const messageElm = document.querySelector('.msg');
const collectionElms = document.querySelector('.collection');
const nameElms = document.querySelector('.product-name');
const priceElms = document.querySelector('.product-price');
const submitBtn = document.querySelector('.submit-btn');

let products = [];

//Showing product to the UI
const showingProducttotheUI = () =>{

    collectionElms.innerHTML = '';
    products.map(product=>{
                    const divElms = `
                    <div class="d-flex align-items-center justify-content-between" data-id="${product.id}">
                        <div class="d-flex align-items-center justify-content-between w-75 my-1">
                            <p class="w-50 text-center py-2 fs-5 bg-success text-light">${product.name}</p>
                            <p class="w-50 text-center py-2 fs-5">-</p>
                            <p class="w-50 text-center py-2 fs-5 bg-success text-light">${product.price}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-end w-25 my-1">
                            <i class="fa-solid fa-pen-to-square fa-lg mx-2 edit-product"></i>
                            <i class="fa-solid fa-trash fa-lg mx-2 delete-product"></i>
                        </div>
                    </div> 
                `;
                console.log(products);
            collectionElms.insertAdjacentHTML('beforeend', divElms);
    });
}



    //Neutralizing the text field
    const neutralize = () =>{
        nameElms.value = '';
        priceElms.value = '';
    }
        //Updating the products list
        const updatedList = (rcvdProduct) =>{
            products.map(product=>{
                if(product.id === rcvdProduct.id){
                    product.name = rcvdProduct.name;
                    product.price = rcvdProduct.price;
                }
            });
        }
//Remove Notifations
const removetext = () =>{
    messageElm.innerHTML = '';
}
//Notifation for the users
const showNotication = (textMsg, action='') =>{
    const divElms = `<div class="bg-${action} d-flex align-items-center justify-content-center">
                        <p class="py-2 fs-5 text-light">${textMsg}</p>
                    </div>`;
    messageElm.insertAdjacentHTML('beforeend', divElms);
    //Remove Notifations
    setTimeout(removetext, 3000);
}
//Validating input from the user
const inputValidation = (name,price) =>{
    if(name =='' || price == ''){
        //Notifation for the users
        showNotication('Name of Price Can not be empty', 'danger');
        return false
    }
    else if(!(Number(name)!==Number(name))){
        showNotication('Name can not be a number', 'danger');
        return false;
    }
    else if(Number(price)!==Number(price)){
        showNotication('Price can not be a string', 'danger');
        return false;
    }
    else{
        showNotication('Product added to the cart', 'success');
        return true;
    }
}
//Making product and add product to the products list
const productify = (name, price) =>{
    const product = {
        id: products.length +1,
        name,
        price
    }
    products.push(product);
    return product;
}
//Getting input from the user
const gettingInput = () =>{
    const name = productName.value;
    const price = productPrice.value;
    return {name, price};
}
const handleInput = (evt) =>{
    evt.preventDefault();
    //Getting input from the user
    const {name,price} = gettingInput();
    //Validating input from the user
    const isValidate = inputValidation(name, price);
    if(!isValidate){
        return;
    }
    //Neutralizing the text field
    neutralize();
    if(submitBtn.classList.contains('update-btn')){
        const id = Number(submitBtn.getAttribute('data-id'));
        const rcvdProduct = {
            id,
            name,
            price
        }
        //Updating the products list
        updatedList(rcvdProduct);
        //Resetting
        submitBtn.classList.remove('bg-Secondary');
        submitBtn.classList.add('bg-info');
        submitBtn.textContent = 'Submit';
        submitBtn.classList.remove('update-btn');
        showingProducttotheUI();
        return;
    }
    //Making product and add product to the products list
    const product = productify(name,price);
    //Showing product to the UI
    showingProducttotheUI();
}
form.addEventListener('submit',handleInput);
    //Finding the editing product
    const findingProduct = (id) =>{
        const product = products.find(product=>product.id===id);
        return product;
    }
    //Populating input Fields
    const populatingInputfields = (product) =>{
        const{id,name,price} = product;
        nameElms.value = name;
        priceElms.value = price;
        submitBtn.classList.remove('bg-info');
        submitBtn.classList.add('bg-secondary');
        submitBtn.textContent = 'Update Product';
        submitBtn.classList.add('update-btn');
        submitBtn.dataset.id = `${id}`;
    }
    //Remove Product from UI
    const removeingProductfromUI = (id) =>{
        document.querySelector(`[data-id="${id}"]`).remove();
    }
    //Filter products list
    const filteringProduct = (id) =>{
        products = products.filter(product=>product.id!==id);
    }
    //Getting ID from the clicked product
    const gettingid = (evt) =>{
        const divElms = evt.target.parentElement.parentElement;
        const id = Number(divElms.getAttribute('data-id'));
        return id;
    }
const modifyingProduct = (evt) =>{
    //Getting ID from the clicked product
    const id = gettingid(evt);
    if(evt.target.classList.contains('edit-product')){
        //Finding the editing product
        const product = findingProduct(id);
        //Populating input Fields
        populatingInputfields(product);
    }
    else if(evt.target.classList.contains('delete-product')){
        //Filter products list
        filteringProduct(id);
        //Remove Product from UI
        removeingProductfromUI(id);
    }
}
collectionElms.addEventListener('click', modifyingProduct)
