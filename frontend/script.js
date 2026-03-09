let books = JSON.parse(localStorage.getItem("books")) || [];

const bookList = document.querySelector(".book-list");
const guardarBtn = document.getElementById("guardarLibro");

books.forEach(book => {

    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    bookCard.innerHTML = `
        <h3>${book.titulo}</h3>
        <p>Autor: ${book.autor}</p>
        <p>Género: ${book.genero}</p>
        <p>${book.descripcion}</p>
        <p>Precio: $${book.precio}</p>
        <p>${book.intercambio ? "Disponible para intercambio" : ""}</p>
    `;

    bookList.appendChild(bookCard);

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
  `;

  bookList.appendChild(bookCard);

  document.getElementById("titulo").value = ""
  document.getElementById("autor").value = ""
  document.getElementById("genero").value = ""
  document.getElementById("descripcion").value = ""
  document.getElementById("precio").value = ""
  document.getElementById("intercambio").checked = false



});
