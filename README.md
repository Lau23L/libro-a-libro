# 📚 Libro a Libro

Plataforma web para compra, venta e intercambio de libros usados enfocada en la comunidad de **Mar del Plata**.

## 🚀 Estado del Proyecto: MVP Completado
El proyecto ha alcanzado su primera versión funcional estable, permitiendo un flujo completo de usuario.

### Funcionalidades actuales:
- **Autenticación Personalizada:** Sistema de registro e inicio de sesión con validación de credenciales.
- **Gestión de Inventario:** Los usuarios pueden publicar libros, subir imágenes y gestionar sus propias publicaciones (solo el dueño puede eliminar sus libros).
- **Buscador Inteligente:** Filtro en tiempo real por título, autor o género.
- **Mensajería Interna:** Sistema para contactar vendedores y acordar puntos de encuentro de forma segura.

---

## 🛠️ Tecnologías Implementadas
- **Frontend:** HTML5, CSS3 (Flexbox, Grid, Animaciones dinámicas).
- **Lógica:** JavaScript (ES6+), manejo de eventos dinámicos y persistencia de sesión.
- **Almacenamiento:** `LocalStorage` para persistencia de datos (Libros, Usuarios y Mensajes).

---

## 📱 Vista Previa

| Index | Publicación de Libros | Mensajería Interna |
| :---: | :---: | :---: |
| ![Index](/imagenes/index.jpg) | ![Publicar](/imagenes/publicar-libro.jpg) | ![Mensaje](/imagenes/Contactar.jpg) |

---

## 🛠️ Guía de Uso Rápido
1. Clonar el repositorio.
2. Abrir `index.html` en el navegador (no requiere servidor por el momento).
3. **Registro:** Crear una cuenta en `registro.html`.
4. **Login:** Ingresar con tus credenciales.
5. **Explorar:** ¡Publicá un libro o contactá a otro vendedor!

---

## 📈 Próximos Pasos (Roadmap)
- [ ] Migración de datos a **PostgreSQL**.
- [ ] Implementación de Backend con **Node.js**.
- [ ] Panel de "Mis Mensajes" para gestionar conversaciones recibidas.
- [ ] Geolocalización para puntos de encuentro sugeridos en Mar del Plata.

## 📊 Database Diagram
![Database Diagram](diagramas/database-diagram.png)