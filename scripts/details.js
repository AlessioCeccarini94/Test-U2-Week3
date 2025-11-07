const url = location.search
console.log(url)
const alltheParameters = new URLSearchParams(url)
const id = alltheParameters.get("id")
console.log(id)

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThlMmY0YmQ0NzAwMTU4NWIxY2YiLCJpYXQiOjE3NjI1MDg1NzEsImV4cCI6MTc2MzcxODE3MX0.54UYwKH9PP-eBbLxf9KOOrJsle3HuHbvQHxI_MGakKE"

const productURL = "https://striveschool-api.herokuapp.com/api/product/"

const details = function () {
  fetch(productURL + id, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((productDetail) => {
      console.log(productDetail)
      document.getElementById("name").innerText = productDetail.name
      document.getElementById("description").innerText =
        productDetail.description
      document.getElementById("brand").innerText = productDetail.brand
      document.getElementById("price").innerText = productDetail.price + "€"

      const imgContainer = document.getElementById("img-container")
      imgContainer.innerHTML = `<img src=" ${productDetail.imageUrl}" class="card-img-top" alt="..." id="imageUrl"/>`
    })
    .catch((err) => {
      console.log(err)
    })
}
details()

const deleteBtn = function () {
  fetch(productURL + id, {
    headers: { Authorization: token },
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        location.assign("./index.html")
      } else {
        throw new Error(res.status)
      }
    })
    .then(() => {})
    .catch((err) => {
      console.log(err)
    })
}

const modifyBtn = function () {
  location.assign("./backoffice.html?id=" + id)
}
