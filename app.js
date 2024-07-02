const loadProducts = () => {
    const loaderSpinner = document.getElementById("loader")
    if (loaderSpinner) {
        loaderSpinner.style.display = "block"
    }
    const url = `https://fakestoreapi.com/products`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayProduct(data)
            loaderSpinner.style.display = "none"
        })
        .catch((err) => console.log("error: ", err))
}

const displayProduct = (products) => {
    document.getElementById("card-container").innerHTML = ''
    products.forEach((product) => {
        const cardContainer = document.getElementById("card-container")
        const cardDiv = document.createElement("div")
        cardDiv.classList.add("card")
        cardDiv.style.width = '22rem'
        cardDiv.innerHTML = `
            <img src="${product.image}" style="width:150px; height:200px; display:block; margin: 0 auto;" class="card-img-top p-1" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title.slice(0, 30)}</h5>
                <p class="card-text">${product.category}</p>
                <p class="card-text">${product.price}</p>
                <p class="card-text">${product.rating.rate}</p>
                <p class="card-text">${product.description.slice(0, 100)}</p>
                <a href="productDetails.html?id=${product.id}" class="btn btn-primary">Details</a>
            </div>
            
        `
        cardContainer.appendChild(cardDiv)
    });
}

const loadCategory = () => {
    const categoryUrl = `https://fakestoreapi.com/products/categories`
    fetch(categoryUrl)
        .then((res) => res.json())
        .then((data) => displayCategory(data))
        .catch((err) => console.log("error: ", err))
}

const displayCategory = (categories) => {
    categories.forEach((category) => {
        console.log(categories)
        const categoryContainer = document.getElementById("category-container")
        const li = document.createElement("li")
        li.innerHTML = `
            <a class="dropdown-item" onclick="handleFilterCategory('${category.replace(/'/g, "\\'")}')">${category}</a>
        `
        categoryContainer.appendChild(li)
    })
}

const handleFilterCategory = (productCategory) => {
    document.getElementById("loader").style.display = "block"
    const encodedCategory = encodeURIComponent(productCategory)
    const url = `https://fakestoreapi.com/products/category/${encodedCategory}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayProduct(data)
            document.getElementById("loader").style.display = "none"
        })
        .catch((err) => console.log("error: ", err))

}

const getParams = () => {
    const param = new URLSearchParams(window.location.search).get("id");
    if (param) {
        fetch(`https://fakestoreapi.com/products/${param}`)
            .then(res => res.json())
            .then(data => displayProductDetails(data))
            .catch((err) => console.log("error: ", err));
    }
};


const displayProductDetails = (product) => {
    const productDetailsContainer = document.getElementById("product-details");
    if (productDetailsContainer) {
        productDetailsContainer.innerHTML = `

            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Category: ${product.category}</p>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
                    </div>
                </div>
            </div>
        `;
    }
};



loadProducts()
loadCategory()
getParams()