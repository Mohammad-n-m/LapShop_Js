//                                       """"" <MOHAMMAD NAHALI MOGADAM/> """""
//                                       """"" <MOHAMMAD NAHALI MOGADAM/> """""
//                                       """"" <MOHAMMAD NAHALI MOGADAM/> """""



let $=document;
// our products
// lengthPU is how much we have of each product
let product_array=[
    {id:1,name:"asus",src:"./Images/a.jpg",price:155,lengthPU:10},
    {id:2,name:"lenovo",src:"./Images/b.jpg",price:150,lengthPU:5},
    {id:3,name:"samsung",src:"./Images/c.jpg",price:235,lengthPU:3},
    {id:4,name:"asus",src:"./Images/d.jpg",price:173,lengthPU:15},
    {id:5,name:"samsung",src:"./Images/e.jpg",price:300,lengthPU:5},
    {id:6,name:"lenovo",src:"./Images/f.jpg",price:79,lengthPU:1},
    {id:7,name:"asus",src:"./Images/g.jpg",price:155,lengthPU:10},
    {id:8,name:"lenovo",src:"./Images/h.jpg",price:150,lengthPU:5},
    {id:9,name:"samsung",src:"./Images/i.jpg",price:235,lengthPU:3},
    {id:10,name:"asus",src:"./Images/j.jpg",price:173,lengthPU:15},
    {id:11,name:"samsung",src:"./Images/k.jpg",price:300,lengthPU:5},
    {id:12,name:"lenovo",src:"./Images/l.jpg",price:79,lengthPU:1}
]

// user basket
let user_Basket=[];

//value of product in each pages
let page_row=3
let page_now;



// set user localStorage value to user basket
window.addEventListener('load', set_value_product_and_page_now)



// get values of localStorage and set to user_basket  and  page_now
function set_value_product_and_page_now(){
    
    if(JSON.parse(localStorage.getItem('page_now'))!=null){
        page_now=JSON.parse(localStorage.getItem('page_now'))
    }
    else{
        page_now=1;
    }
    create_product();
    
    if(JSON.parse(localStorage.getItem('basket'))!=null){
        user_Basket=JSON.parse(localStorage.getItem('basket'))
        create_user_basket();
    }
}



// create our product Elem and show to user
function create_product(){

    $.querySelector(".product_items").innerHTML="";

    let end_Index = page_row * page_now
    let start_Index = end_Index - page_row
    let items_In_EveryPage = product_array.slice(start_Index, end_Index)


    items_In_EveryPage.forEach(function(items_EveryPage){


    document.querySelector('.shop-items').insertAdjacentHTML('afterbegin',
 `<div class="shop-item">
         <span class="shop-item-title">${items_EveryPage.name}</span>
         <img class="shop-item-image" src="${items_EveryPage.src}">
        <div class="shop-item-details">
            <span class="shop-item-price">${items_EveryPage.price}</span>
             <button class="btn btn-primary shop-item-button" onclick="check_product_in_user_baket(${items_EveryPage.id},'${items_EveryPage.name}',${items_EveryPage.price},'${items_EveryPage.src}')">ADD TO CART</button>
        </div>
 </div>`
);

    })
    Create_Pagening_BTN()
}

function check_product_in_user_baket(Aid,Aname,Aprice,Asrc){
    // check is there same product or not. if there was same product do not add product to user basket.
    let bool=false;
    user_Basket.forEach(function(a){
        if(a.id==Aid)
        bool=true;
            })
            
            // if there is not same product then add it
            if(!bool){
                let obj={
                    id:Aid,
                    name:Aname,
                    src:Asrc,
                    price:Aprice,
                    //amount is lenght of product that user want product
                    amount:1
                }
                user_Basket.push(obj)
                localStorageHandler();
            }
          
};




function Create_Pagening_BTN(){

    $.querySelector('.pagning_holder').innerHTML="";
let lenghtOfPagening=Math.ceil(product_array.length/page_row);

    for (let index = 1; index <= lenghtOfPagening; index++) {
        
        let btn=$.createElement('button')
        btn.innerHTML=index;
        btn.classList.add('pageningBtn')
        $.querySelector('.pagning_holder').append(btn)
    
        if(index==page_now){
    btn.classList.add('active')
    localStorage.setItem('page_now',JSON.stringify(index))
        }
        
        btn.addEventListener('click', function () {
            page_now = index
            create_product()
        })
    }
    }






// set user basket to localStorage
function localStorageHandler(){
   localStorage.setItem('basket',JSON.stringify(user_Basket));
    create_user_basket()
    TotalPrice()
}


// create elem and return it
function returnElem(item){
    return $.createElement(item)
}

// set class and innerHtml for element in User basket
function create_user_basket(){

    //clear value every time and run of first
    $.querySelector('.cart-items').innerHTML="";

    user_Basket.forEach(function(item){
        $.querySelector('.cart-items').insertAdjacentHTML('beforeend',`<div class="cart-row"><div class="cart-item cart-column"><img class="cart-item-image" src="${item.src}"><span class="cart-item-title">${item.name}</span></div><span class="cart-price cart-column">${item.price}</span><div class="cart-quantity cart-column"><input class="cart-quantity-input" type="number" value=${item.amount} onchange="change_count_of_product(${item.id})"><button class="btn btn-danger" onclick="delete_product_in_userbasket(${item.id})">remove</button></div></div>`)

        //set products price 
        TotalPrice()

    })
}
// delete and find index of deleted item
function delete_product_in_userbasket(id_product){
                let result= user_Basket.findIndex(function(ex){
                return id_product==ex.id
             })
           user_Basket.splice(result,1)
            localStorageHandler()
}



 // set event change to set products price 
function change_count_of_product(id_product){

    let indexBasket= user_Basket.findIndex(function(a){
        return a.id==id_product
         })
         let all_product_array=$.querySelectorAll('.cart-quantity-input');
         let maxOfProduct=product_array[user_Basket[indexBasket].id-1].lengthPU


         if(maxOfProduct>=all_product_array[indexBasket].value){
              user_Basket[indexBasket].amount=all_product_array[indexBasket].value;
            }
            else{
         alert('wrong! You selected hight amount of product!!!');
         user_Basket[indexBasket].amount=maxOfProduct;
        }
        
        if(Number(all_product_array[indexBasket].value)<1){
            
            user_Basket[indexBasket].amount=1;
        }
        
        localStorageHandler()
        TotalPrice()
}



// for set products price 
function TotalPrice(){
    let priceUser=0;
  user_Basket.forEach(function(item){
 priceUser+=(item.price)*item.amount
  })
    $.querySelector('.cart-total-price').innerHTML=priceUser+"$"
}



//                                       """"" <MOHAMMAD NAHALI MOGADAM/> """""
//                                       """"" <MOHAMMAD NAHALI MOGADAM/> """""
//                                       """"" <MOHAMMAD NAHALI MOGADAM/> """""


