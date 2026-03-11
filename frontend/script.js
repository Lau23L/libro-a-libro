const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"))

if(!usuarioActivo){
alert("Debes iniciar sesión")
window.location.href = "login.html"
}

let books = JSON.parse(localStorage.getItem("books")) || [];

const usuarioNombre = document.getElementById("usuarioNombre")

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
  if (event.target == mensajeModal) {
    mensajeModal.style.display = "none";
  }
};


/* ---------------- MOSTRAR LIBROS ---------------- */

function renderBook(book, index) {

  const bookCard = document.createElement("div");
  bookCard.classList.add("book");

  // Permitir eliminar si el libro es mío O si no tiene dueño (undefined)
  const puedeEliminar = !book.usuarioId || book.usuarioId === usuarioActivo.id;

  bookCard.innerHTML = `
    ${book.imagen ? `<img src="${book.imagen}" class="book-img">` : ""}
    <h3>${book.titulo}</h3>
    <p>Autor: ${book.autor}</p>
    <p>Género: ${book.genero}</p>
    <p>${book.descripcion}</p>
    <p>Precio: <strong>$${Number(book.precio).toLocaleString('es-AR')}</strong></p>
    ${book.intercambio ? `<span class="badge-intercambio">🔄 Intercambio</span>` : ""}
    <p class="vendedor">Publicado por: ${book.usuarioNombre}</p>
    
    ${puedeEliminar ? 
            '<button class="delete-btn">Eliminar</button>' : 
            '<button class="contact-btn">Contactar</button>'}
  `;

  const deleteBtn = bookCard.querySelector(".delete-btn");

  // Solo agregamos el evento SI el botón existe (es decir, si el libro es mío)
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      bookCard.classList.add("removing"); // Agregamos la clase de animación
    
      setTimeout(() => { // Esperamos a que termine la animación para borrar
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        bookList.innerHTML = ""; 
        books.forEach((b, i) => renderBook(b, i));
      }, 300);
    });
  }  
    

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
      usuarioId: usuarioActivo.id, 
      usuarioNombre: usuarioActivo.nombre
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


/* ---------------- SISTEMA DE MENSAJERÍA ---------------- */

const mensajeModal = document.getElementById("mensajeModal");
const cerrarMensaje = document.querySelector(".cerrar-mensaje");
const enviarMensajeBtn = document.getElementById("enviarMensajeBtn");
let libroSeleccionado = null;

// Evento para abrir el modal de contacto
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("contact-btn")) {
    // Buscamos cuál es el libro dueño de ese botón
    const card = e.target.closest(".book");
    const cards = Array.from(document.querySelectorAll(".book"));
    const index = cards.indexOf(card);
    
    libroSeleccionado = books[index];

    // Personalizamos el modal con el nombre del vendedor
    const tituloModal = document.getElementById("mensajeTitulo");
    if (tituloModal) {
      tituloModal.innerText = `Contactar a ${libroSeleccionado.usuarioNombre || "Vendedor"}`;
    }
    
    mensajeModal.style.display = "flex";
  }
});

// Cerrar modal de mensaje
if (cerrarMensaje) {
  cerrarMensaje.onclick = () => {
    mensajeModal.style.display = "none";
  };
}

// Lógica para enviar y guardar el mensaje en LocalStorage
if (enviarMensajeBtn) {
  enviarMensajeBtn.onclick = function () {
    const texto = document.getElementById("textoMensaje").value;

    if (!texto.trim()) {
      alert("Por favor, escribe un mensaje antes de enviar.");
      return;
    }

    // Estructura del mensaje
    const nuevoMensaje = {
      id: Date.now(),
      emisorId: usuarioActivo.id,
      emisorNombre: usuarioActivo.nombre,
      receptorId: libroSeleccionado.usuarioId,
      libroTitulo: libroSeleccionado.titulo,
      contenido: texto,
      fecha: new Date().toLocaleString()
    };

    // Guardar en una lista de mensajes en LocalStorage
    const mensajesExistentes = JSON.parse(localStorage.getItem("mensajes")) || [];
    mensajesExistentes.push(nuevoMensaje);
    localStorage.setItem("mensajes", JSON.stringify(mensajesExistentes));

    alert("¡Mensaje enviado con éxito!");
    mensajeModal.style.display = "none";
    document.getElementById("textoMensaje").value = ""; // Limpiar el campo
  };
}

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


