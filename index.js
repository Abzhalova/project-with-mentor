const API = 'http://localhost:3000/product'

async function fetchProduct(){
   const response= await fetch(API)    //бекендке запрос таштадым
        
   
   const products = await response.json()
   
   displayProducts(products)
   
}

function displayProducts(products) {
   const productList = document.querySelector('.main')

   productList.innerHTML = products.map(product => `
         <div class='product'>
           <img src=" ${product.img}" alt='Error :(' class='product__img' />
           <h2 class='product__title'>${product.title}</h2>
           <p class='product__desc'>${product.description}</p>
           <p class='product__price'><span class='product__price_text'>${product.price}</span></p>
           <div class="btns">
           <a href='edit.html?id=${product.id}' class="edit__link">Редактирование</a>
           <button class="delete__btn" onclick="deleteProduct(${product.id})">Delete</button>
           </div>
         </div>
      `)
   
}


async function deleteProduct(id){
   await fetch (`${API}/${id}`,{
      method: "DELETE"
   })
   fetchProduct()
}


fetchProduct()




async function addProduct(){
   const title = document.getElementById('title').value
   const description = document.getElementById('description').value
   const price = document.getElementById('price').value
   const img = document.getElementById('img').value


   const newProduct = {
      id: Date.now(),
      title,
      description,
      img,
      price: Number(price)
    
   }
   
   await fetch(API, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct)
   })
   fetchProduct()
}

