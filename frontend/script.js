let books = JSON.parse(localStorage.getItem("books")) || [];

const bookList = document.querySelector(".book-list");
const guardarBtn = document.getElementById("guardarLibro");

const botonPublicar = document.getElementById("publicarBtn");
const modal = document.getElementById("formularioModal");
const cerrar = document.querySelector(".cerrar");

const searchInput = document.getElementById("searchInput");


/* ---------------- POPUP ---------------- */

botonPublicar.onclick = function () {
  modal.style.display = "flex";
};

cerrar.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


/* ---------------- MOSTRAR LIBROS ---------------- */

function renderBook(book, index) {

  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  bookCard.innerHTML = `
    ${book.imagen ? `<img src="${book.imagen}" class="book-img">` : ""}
    <h3>${book.titulo}</h3>
    <p>Autor: ${book.autor}</p>
    <p>Género: ${book.genero}</p>
    <p>${book.descripcion}</p>
    <p>Precio: <strong>$${Number(book.precio).toLocaleString('es-AR')}</strong></p>
    ${book.intercambio ? `<span class="badge-intercambio">🔄 Intercambio</span>` : ""}
    <button class="delete-btn">Eliminar</button>
  `;

  const deleteBtn = bookCard.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", function () {
    bookCard.classList.add("removing"); // Agregamos la clase de animación
    
    setTimeout(() => { // Esperamos a que termine la animación para borrar
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        bookList.innerHTML = ""; 
        books.forEach((b, i) => renderBook(b, i));
    }, 300);
});

  bookList.appendChild(bookCard);
}


books.forEach((book, index) => {
  renderBook(book, index);
});


/* ---------------- GUARDAR LIBRO ---------------- */

guardarBtn.addEventListener("click", function () {

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const genero = document.getElementById("genero").value;
  const descripcion = document.getElementById("descripcion").value;
  const precio = document.getElementById("precio").value;
  const intercambio = document.getElementById("intercambio").checked;

  const imagenInput = document.getElementById("imagenLibro");
  
  // Validación simple: Si no hay título o el precio es menor a 0, detenemos todo
  if (titulo.trim() === "" || precio < 0) {
    alert("Por favor, completa el título y asegúrate de que el precio sea válido.");
    return; // El código se detiene aquí y no guarda nada
  }

  const file = imagenInput.files[0];

  const reader = new FileReader();

  reader.onload = function () {

    const nuevoLibro = {
      titulo,
      autor,
      genero,
      descripcion,
      precio,
      intercambio,
      imagen: reader.result
    };

    books.push(nuevoLibro);

    localStorage.setItem("books", JSON.stringify(books));

    renderBook(nuevoLibro, books.length - 1);

    modal.style.display = "none";

  };

  if (file) {

    reader.readAsDataURL(file);

  } else {

    const nuevoLibro = {
      titulo,
      autor,
      genero,
      descripcion,
      precio,
      intercambio,
      imagen: ""
    };

    books.push(nuevoLibro);

    localStorage.setItem("books", JSON.stringify(books));

    renderBook(nuevoLibro, books.length - 1);

    modal.style.display = "none";
  }


  document.getElementById("titulo").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("genero").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("intercambio").checked = false;

});


/* ---------------- BUSCADOR ---------------- */

searchInput.addEventListener("input", function () {
  const term = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".book");
  let encontrados = 0;

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(term)) {
      card.style.display = "flex"; // Usamos flex para mantener tu diseño
      encontrados++;
    } else {
      card.style.display = "none";
    }
  });

});


