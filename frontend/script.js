let books = JSON.parse(localStorage.getItem("books")) || [];

const bookList = document.querySelector(".book-list");
const guardarBtn = document.getElementById("guardarLibro");

function renderBook(book, index) {

  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  bookCard.innerHTML = `
    <h3>${book.titulo}</h3>
    <p>Autor: ${book.autor}</p>
    <p>Género: ${book.genero}</p>
    <p>${book.descripcion}</p>
    <p>Precio: $${book.precio}</p>
    <p>${book.intercambio ? "Disponible para intercambio" : ""}</p>
    <button class="delete-btn">Eliminar</button>
  `;

  const deleteBtn = bookCard.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", function () {

    books.splice(index, 1);

    localStorage.setItem("books", JSON.stringify(books));

    location.reload();

  });

  bookList.appendChild(bookCard);

}

books.forEach((book, index) => {
  renderBook(book, index);
});


guardarBtn.addEventListener("click", function() {

  const titulo = document.getElementById("titulo").value
  const autor = document.getElementById("autor").value
  const genero = document.getElementById("genero").value
  const descripcion = document.getElementById("descripcion").value
  const precio = document.getElementById("precio").value
  const intercambio = document.getElementById("intercambio").checked
  

  const nuevoLibro = {
    titulo: titulo,
    autor: autor,
    genero: genero,
    descripcion: descripcion,
    precio: precio,
    intercambio: intercambio

  }

  books.push(nuevoLibro)

  localStorage.setItem("books", JSON.stringify(books))

  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  bookCard.innerHTML = `
  <h3>${titulo}</h3>
  <p>Autor: ${autor}</p>
  <p>Género: ${genero}</p>
  <p>${descripcion}</p>
  <p>Precio: $${precio}</p>
  <p>${intercambio ? "Disponible para intercambio" : ""}</p>
  <button class="delete-btn">Eliminar</button>
  `;

  bookList.appendChild(bookCard);

  document.getElementById("titulo").value = ""
  document.getElementById("autor").value = ""
  document.getElementById("genero").value = ""
  document.getElementById("descripcion").value = ""
  document.getElementById("precio").value = ""
  document.getElementById("intercambio").checked = false

  const deleteBtn = bookCard.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", function() {

    books = books.filter(b => b.titulo !== titulo);

    localStorage.setItem("books", JSON.stringify(books));

    bookCard.remove();

  });

});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

  const term = searchInput.value.toLowerCase();

  const cards = document.querySelectorAll(".book");

  cards.forEach(card => {

    const text = card.innerText.toLowerCase();

    if (text.includes(term)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});

