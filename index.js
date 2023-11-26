let totalPrice = 0;

function submitForm() {
    var product = document.getElementById("product").value;
    var price = parseFloat(document.getElementById("price").value);

    if (isNaN(price)) {
        alert("Please enter a valid price");
        return;
    }

    
    var productEntry = document.createElement("div");
    productEntry.innerHTML = `
        <p>Product: ${product} | Selling Price: $${price}</p>
        <button onclick="deleteProduct(this, ${price})">Delete</button>
    `;

    
    totalPrice += price;
    updateTotalPrice();

    
    document.getElementById("productInfo").appendChild(productEntry);

    
    document.getElementById("product").value = "";
    document.getElementById("price").value = "";

    
    createProduct(product, price);
}

function deleteProduct(button, price) {
    
    var productInfoDiv = document.getElementById("productInfo");
    productInfoDiv.removeChild(button.parentNode);

    
    totalPrice -= price;
    updateTotalPrice();

    
    var productId = button.parentNode.dataset.productId;

    
    deleteProductById(productId);
}

function updateTotalPrice() {
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}



function createProduct(product, price) {
    axios.post('https://crudcrud.com/api/a467c3d125bb4370820389ccaf01ced2/products', {
        product: product,
        price: price
    })
    .then(function (response) {
        console.log('Product created:', response.data);
        
        var productEntry = document.getElementById("productInfo").lastChild;
        productEntry.dataset.productId = response.data._id;
    })
    .catch(function (error) {
        console.error('Error creating product:', error);
    });
}

function deleteProductById(productId) {
    axios.delete(`https://crudcrud.com/api/a467c3d125bb4370820389ccaf01ced2/products/${productId}`)
    .then(function (response) {
        console.log('Product deleted:', response.data);
    })
    .catch(function (error) {
        console.error('Error deleting product:', error);
    });
}
