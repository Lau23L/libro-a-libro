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

const loginBtn = document.getElementById("loginBtn")

if (loginBtn) {

loginBtn.addEventListener("click", function(){

const email = document.getElementById("emailLogin").value
const password = document.getElementById("passwordLogin").value

const users = JSON.parse(localStorage.getItem("users")) || []

const usuario = users.find(u => u.email === email && u.password === password)

if(usuario){

localStorage.setItem("usuarioActivo", JSON.stringify(usuario))

alert("Login correcto")

window.location.href = "index.html"

} else {

alert("Email o contraseña incorrectos")

}

})

}