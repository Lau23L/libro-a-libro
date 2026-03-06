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