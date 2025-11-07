const productURL = "https://striveschool-api.herokuapp.com/api/product"

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlMmY0YmQ0NzAwMTU4NWIxY2YiLCJpYXQiOjE3NjI1MDg1NzEsImV4cCI6MTc2MzcxODE3MX0.54UYwKH9PP-eBbLxf9KOOrJsle3HuHbvQHxI_MGakKE"

const url = location.search
const alltheParameters = new URLSearchParams(url)
const id = alltheParameters.get("id")

if (id) {
  fetch(productURL + "/" + id, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error(`errore ${res.status}`)
    }
  })
}

class item {
  constructor(_name, _description, _imageUrl, _brand, _price) {
    this.name = _name
    this.description = _description
    this.imageUrl = _imageUrl
    this.brand = _brand
    this.price = parseFloat(_price)
  }
}

const form = document.getElementById("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const nameInput = document.getElementById("name")
  const descriptionInput = document.getElementById("description")
  const brandInput = document.getElementById("brand")
  const priceInput = document.getElementById("price")
  const imageUrlInput = document.getElementById("imageUrl")

  const name = nameInput.value
  const description = descriptionInput.value
  const brand = brandInput.value
  const price = priceInput.value
  const imageUrl = imageUrlInput.value

  const newItem = new item(name, description, imageUrl, brand, price)

  console.log(newItem)
  addProduct(newItem)
})

const addProduct = function (item) {
  fetch(productURL, {
    method: "POST",
    body: JSON.stringify(item),
    headers: { Authorization: token, "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        res.json()
        alert("prodotto salvato")
      } else {
        throw new Error(res.status)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

let method

if (id) {
  method = "PUT"
} else {
  method = "POST"
}

let finalUrl
if (id) {
  finalUrl = productURL + "/" + id
} else {
  finalUrl = productURL
}
