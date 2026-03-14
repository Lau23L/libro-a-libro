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

if (usuarioActivo) {
    actualizarNotificaciones();
}

const logoutBtn = document.getElementById("logoutBtn")

if(logoutBtn){

logoutBtn.addEventListener("click", function(){

localStorage.removeItem("usuarioActivo")

window.location.href = "login.html"

})

}

function actualizarNotificaciones() {
    const todos = JSON.parse(localStorage.getItem("mensajes")) || [];
    // Solo contamos los que son PARA MI y NO ESTÁN LEÍDOS
    const noLeidos = todos.filter(m => m.receptorId === usuarioActivo.id && !m.leido);
    
    const btn = document.getElementById("verMensajesBtn");
    if (noLeidos.length > 0) {
        btn.innerHTML = `📬 Mis Mensajes <span class="notificacion-badget">${noLeidos.length}</span>`;
    } else {
        btn.innerHTML = `📬 Mis Mensajes`;
    }
}

function enviarRespuesta(msgOriginalId, receptorId, tituloLibro) {
    const textarea = document.getElementById(`reply-to-${msgOriginalId}`);
    const texto = textarea.value;

    if (!texto.trim()) {
        alert("Por favor, escribe un mensaje.");
        return;
    }

    const respuesta = {
        id: Date.now(),
        emisorId: usuarioActivo.id,
        emisorNombre: usuarioActivo.nombre,
        receptorId: receptorId, // El que era emisor ahora es receptor
        libroTitulo: tituloLibro,
        contenido: texto,
        fecha: new Date().toLocaleString()
    };

    const mensajesExistentes = JSON.parse(localStorage.getItem("mensajes")) || [];
    mensajesExistentes.push(respuesta);
    localStorage.setItem("mensajes", JSON.stringify(mensajesExistentes));

    alert("¡Respuesta enviada con éxito!");
    textarea.value = ""; // Limpiar el campo
    buzonModal.style.display = "none"; // Cerrar buzon
    actualizarNotificaciones(); // Refrescar contador
}

function borrarMensaje(idMensaje) {
    if (confirm("¿Estás seguro de que quieres borrar este mensaje?")) {
        let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
        // Filtramos para dejar todos menos el que queremos borrar
        mensajes = mensajes.filter(m => m.id !== idMensaje);
        localStorage.setItem("mensajes", JSON.stringify(mensajes));
        
        renderizarMensajes(); // Actualizamos la vista
        actualizarNotificaciones(); // Actualizamos el globito del botón
    }
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
      fecha: new Date().toLocaleString(),
      leido: false
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

/* ---------------- LÓGICA DEL BUZÓN ---------------- */

const buzonModal = document.getElementById("buzonModal");
const verMensajesBtn = document.getElementById("verMensajesBtn");
const cerrarBuzon = document.querySelector(".cerrar-buzon");
const listaMensajes = document.getElementById("listaMensajes");

// Abrir/Cerrar Buzón
verMensajesBtn.onclick = function() {
    renderizarMensajes();
    buzonModal.style.display = "flex";
};

cerrarBuzon.onclick = () => buzonModal.style.display = "none";


// 1. Generador de Clave Única (Libro + Usuarios)
function generarClaveChat(tituloLibro, id1, id2) {
    const ids = [String(id1), String(id2)].sort().join("-");
    // Usamos el título del libro como parte de la clave para separar chats
    const libroKey = tituloLibro.toLowerCase().trim().replace(/\s+/g, '_');
    return `${libroKey}_${ids}`;
}

// 2. Renderizar el Buzón
function renderizarMensajes() {
    const todosLosMensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
    const listaMensajes = document.getElementById("listaMensajes");
    listaMensajes.innerHTML = "";

    // Marcar como leídos
    todosLosMensajes.forEach(m => {
        if (m.receptorId === usuarioActivo.id) m.leido = true;
    });
    localStorage.setItem("mensajes", JSON.stringify(todosLosMensajes));
    actualizarNotificaciones();

    // Filtrar mis mensajes
    const misMsjs = todosLosMensajes.filter(m => 
        m.receptorId === usuarioActivo.id || m.emisorId === usuarioActivo.id
    );

    if (misMsjs.length === 0) {
        listaMensajes.innerHTML = "<p style='padding:20px; text-align:center;'>No tienes mensajes.</p>";
        return;
    }

    // AGRUPAR POR LIBRO + USUARIOS
    const grupos = {};
    misMsjs.forEach(m => {
        const clave = generarClaveChat(m.libroTitulo, m.emisorId, m.receptorId);
        if (!grupos[clave]) grupos[clave] = [];
        grupos[clave].push(m);
    });

    for (const clave in grupos) {
        const chat = grupos[clave];
        const info = chat[0];
        const otraPersonaId = info.emisorId === usuarioActivo.id ? info.receptorId : info.emisorId;
        const otraPersonaNombre = info.emisorId === usuarioActivo.id ? (info.receptorNombre || "Usuario") : info.emisorNombre;

        const contenedorChat = document.createElement("div");
        contenedorChat.className = "chat-container-vintage"; // Podés darle estilo en CSS
        contenedorChat.style.cssText = "border: 1px solid #e0dacc; margin-bottom: 20px; border-radius: 8px; background: #faf8f0; overflow: hidden;";
        
        contenedorChat.innerHTML = `
            <div style="background: #8e9775; color: white; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: 'Playfair Display'; font-weight:bold;">📖 ${info.libroTitulo} <small>(con ${otraPersonaNombre})</small></span>
                <button onclick="borrarConversacion('${clave}')" style="background:#c9a0a0; color:white; border:none; padding:3px 8px; border-radius:4px; cursor:pointer; font-size:11px;">Cerrar Chat</button>
            </div>
            <div style="padding: 15px; max-height: 200px; overflow-y: auto; background: #fdf6e3; display: flex; flex-direction: column; gap: 8px;">
                ${chat.map(m => `
                    <div style="align-self: ${m.emisorId === usuarioActivo.id ? 'flex-end' : 'flex-start'}; max-width: 80%;">
                        <div style="padding: 8px 12px; border-radius: 12px; font-size: 13px; 
                            background: ${m.emisorId === usuarioActivo.id ? '#e2e8d8' : '#fff'};
                            border: 1px solid #dcd7c9;">
                            ${m.contenido}
                            <div style="font-size: 9px; opacity: 0.5; margin-top: 3px; text-align: right;">${m.fecha.split(',')[1] || ''}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="padding: 10px; border-top: 1px dashed #e0dacc; display: flex; gap: 5px; background: #fdf6e3;">
                <input type="text" id="input-${clave}" placeholder="Responder..." style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                <button onclick="enviarRespuestaGrupal('${clave}', '${otraPersonaId}', '${info.libroTitulo.replace(/'/g, "\\'")}', '${otraPersonaNombre}')" 
                    style="background: #a67c52; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    Enviar
                </button>
            </div>
        `;
        listaMensajes.appendChild(contenedorChat);
    }
}

// 3. Enviar Respuesta
function enviarRespuestaGrupal(clave, receptorId, titulo, receptorNombre) {
    const input = document.getElementById(`input-${clave}`);
    const texto = input.value;
    if (!texto.trim()) return;

    const respuesta = {
        id: Date.now(),
        emisorId: usuarioActivo.id,
        emisorNombre: usuarioActivo.nombre,
        receptorId: receptorId,
        receptorNombre: receptorNombre,
        libroTitulo: titulo,
        contenido: texto,
        fecha: new Date().toLocaleString(),
        leido: false
    };

    const mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
    mensajes.push(respuesta);
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
    
    input.value = "";
    renderizarMensajes();
}

// 4. Borrar Conversación
function borrarConversacion(clave) {
    if (confirm("¿Borrar esta charla?")) {
        let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];
        mensajes = mensajes.filter(m => generarClaveChat(m.libroTitulo, m.emisorId, m.receptorId) !== clave);
        localStorage.setItem("mensajes", JSON.stringify(mensajes));
        renderizarMensajes();
    }
}

// Función auxiliar para no errar el receptor
function receptorIdCorrecto(clave, otraPersonaId) {
    // La clave contiene los dos IDs. Si el usuario activo es uno, el receptor es el otro.
    // Pero para simplificar, usamos directamente el ID que capturamos en el render.
    return receptorId; 
}

// Actualizar el cierre universal (el de hacer clic afuera)
window.addEventListener("click", function(event) {
    if (event.target == buzonModal) {
        buzonModal.style.display = "none";
    }
});

// Ejecutar al cargar la página
actualizarNotificaciones();


