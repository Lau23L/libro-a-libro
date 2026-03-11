let users = JSON.parse(localStorage.getItem("users")) || []

const registrarBtn = document.getElementById("registrarBtn")

if(registrarBtn) {

registrarBtn.addEventListener("click", function() {

const nombre = document.getElementById("nombre").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value

if(!nombre || !email || !password){
alert("Completa todos los campos")
return
}

const nuevoUsuario = {
id: Date.now(),
nombre: nombre,
email: email,
password: password
}

users.push(nuevoUsuario)

localStorage.setItem("users", JSON.stringify(users))

alert("Usuario creado")

})

}