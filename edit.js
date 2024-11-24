const API = 'http://localhost:3000/product'

async function fetchProductById(id){
    const response = await fetch( `${API}/${id}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json()
}

async function updateProduct(productId, newProduct){
    await fetch( `${API}/${productId}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newProduct)

    })
}

document.addEventListener('DOMContentLoaded', async () =>{
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')
    
    const product = await fetchProductById(productId)

    document.getElementById('title').value = product.title
    document.getElementById('description').value = product.description
    document.getElementById('price').value = product.price
    document.getElementById('img').value = product.img

    const editForm = document.getElementById('form')
    editForm.addEventListener('submit', async (e) =>{
        e.preventDefault()

        const newProduct = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            img: document.getElementById('img').value
        }

        await updateProduct(productId, newProduct)

        window.location.href = 'index.html'
    })

})