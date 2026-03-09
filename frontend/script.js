let books = JSON.parse(localStorage.getItem("books")) || [];

const bookList = document.querySelector(".book-list");
const guardarBtn = document.getElementById("guardarLibro");

books.forEach(book => {

    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Autor: ${book.author}</p>
        <p>Precio: $${book.price}</p>
        <p>Estado: ${book.condition}</p>
    `;

    bookList.appendChild(bookCard);

});

guardarBtn.addEventListener("click", function() {

  const titulo = document.getElementById("titulo").value
  const autor = document.getElementById("autor").value
  const genero = document.getElementById("genero").value
  const descripcion = document.getElementById("descripcion").value

  const nuevoLibro = {
    titulo: titulo,
    autor: autor,
    genero: genero,
    descripcion: descripcion
  }

  books.push(nuevoLibro)

  localStorage.setItem("books", JSON.stringify(books))

});


