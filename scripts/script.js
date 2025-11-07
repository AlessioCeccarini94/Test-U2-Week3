const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlMmY0YmQ0NzAwMTU4NWIxY2YiLCJpYXQiOjE3NjI1MDg1NzEsImV4cCI6MTc2MzcxODE3MX0.54UYwKH9PP-eBbLxf9KOOrJsle3HuHbvQHxI_MGakKE"

const productURL = "https://striveschool-api.herokuapp.com/api/product/"
console.log(productURL)

const getProduct = function () {
  fetch(productURL, {
    headers: {
      Authorization: token,
    },
  })
    .then(function (res) {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`errore ${res.status}`)
      }
    })

    .then((arrayOfProduct) => {
      console.log(arrayOfProduct)
      const row = document.getElementById("row")
      arrayOfProduct.forEach((item) => {
        row.innerHTML += `
              <div class="col-12 col-md-4 col-lg-3 text-center m-3">
                <div class="card h-100 d-flex flex-column align-items-center">
                    <img src="${
                      item.imageUrl
                    }" class="card-img-top flex-grow-1" alt="...">
                    <div class="d-flex flex-column align-middle card-body flex-grow-1 justify-content-end w-100">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text">${item.brand}</p>
                        <p class="card-text">${item.price} €</p>
                    </div>
                    <div class="w-100 d-flex justify-content-evenly m-3">
                    <a href="./details.html?id=${
                      item._id
                    }" class="btn ">Vai ai dettagli</a>
                    <button type="button" class="btn" id="cart" onclick="addToCart(${JSON.stringify(
                      item
                    )})">Aggiungi al Carrello</button>
                    </div>
                </div>
            </div>
        `
      })
    })

    .catch((error) => {
      console.log("errore", error)
    })
}
getProduct()

const addToCart = function (item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []
  cart.push(item)
  localStorage.setItem("cart", JSON.stringify(cart))
}
