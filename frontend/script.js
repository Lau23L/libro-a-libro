let books = JSON.parse(localStorage.getItem("books")) || [];

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))

const usuarioNombre = document.getElementById("usuarioNombre")

if(!usuarioActivo){
alert("Debes iniciar sesión")
window.location.href = "login.html"
}

if(usuarioActivo && usuarioNombre){
usuarioNombre.textContent = "Hola " + usuarioActivo.nombre
}

const logoutBtn = document.getElementById("logoutBtn")

if(logoutBtn){

logoutBtn.addEventListener("click", function(){

localStorage.removeItem("usuarioActivo")

window.location.href = "login.html"

})

}

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

  if (titulo.trim() === "" || precio < 0) {
    alert("Por favor, completa el título y el precio.");
    return;
  }

  const file = imagenInput.files[0];

  // Función para procesar el guardado final
  const guardarFinal = (imgData) => {
    const nuevoLibro = {
      titulo,
      autor,
      genero,
      descripcion,
      precio,
      intercambio,
      imagen: imgData,
      usuarioId: usuarioActivo ? usuarioActivo.id : null // Evita error si no hay usuario
    };

    books.push(nuevoLibro);
    localStorage.setItem("books", JSON.stringify(books));
    renderBook(nuevoLibro, books.length - 1);
    
    // Cerrar y limpiar
    modal.style.display = "none";
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("descripcion").value = "";
    imagenInput.value = ""; // Limpiar el input de archivo
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => guardarFinal(reader.result);
    reader.readAsDataURL(file);
  } else {
    guardarFinal(""); // Guardar sin imagen
  }
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


