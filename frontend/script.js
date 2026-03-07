const books = [
    {
        title: "Harry Potter y la piedra filosofal",
        author: "J.K. Rowling",
        price: 5000,
        condition: "Buen estado"
    },
    {
        title: "El principito",
        author: "Antoine de Saint-Exupéry",
        price: 2000,
        condition: "Usado"
    },
    {
        title: "1984",
        author: "George Orwell",
        price: 4500,
        condition: "Muy bueno"
    }
];

const bookList = document.querySelector(".book-list");

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

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {

    const searchTerm = searchInput.value.toLowerCase();
    const bookCards = document.querySelectorAll(".book");

    bookCards.forEach(card => {

        const text = card.innerText.toLowerCase();

        if (text.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});