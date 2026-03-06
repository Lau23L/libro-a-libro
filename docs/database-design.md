# Diseño de base de datos

## Users
Tabla que guarda los usuarios registrados.

Campos:
- id
- name
- email
- password
- city
- created_at

## Books
Libros publicados por los usuarios.

Campos:
- id
- title
- author
- description
- condition
- price
- exchange_possible
- user_id
- created_at

## Messages
Mensajes entre usuarios interesados en libros.

Campos:
- id
- sender_id
- receiver_id
- book_id
- message
- created_at

## Exchanges
Registro de intercambios o ventas de libros.

Campos:
- id
- book_id
- buyer_id
- seller_id
- status
- created_at
