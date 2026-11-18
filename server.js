const express = require("express"); 
const app = express(); 
 
app.use(express.json());          // read JSON from requests 
app.use(express.static("public")); // serve index.html and script.js 
 
let books = [ 
  { id: 1, title: "Learning HTML", author: "Sample Author", year: 2022 }, 
  { id: 2, title: "Introduction to JavaScript", author: "Sample Writer", year: 2023 }, 
]; 
let nextId = 3; 
// READ all 
app.get("/api/books", (req, res) => { 
res.json(books); 
}); 
// READ one 
app.get("/api/books/:id", (req, res) => { 
const book = books.find((b) => b.id === Number(req.params.id)); 
if (!book) return res.status(404).json({ message: "Book not found" }); 
res.json(book); 
}); 
// CREATE 
app.post("/api/books", (req, res) => { 
const { title, author, year } = req.body; 
if (!title || !author || !Number.isInteger(Number(year))) { 
return res.status(400).json({ message: "Title, author and numeric year are required" }); 
} 
const book = { id: nextId++, title: title.trim(), author: author.trim(), year: Number(year) }; 
books.push(book); 
res.status(201).json(book); 
}); 
// UPDATE 
app.patch("/api/books/:id", (req, res) => { 
const book = books.find((b) => b.id === Number(req.params.id)); 
if (!book) return res.status(404).json({ message: "Book not found" }); 
const { title, author, year } = req.body; 
if (title) book.title = title.trim(); 
if (author) book.author = author.trim(); 
if (year) book.year = Number(year); 
res.json(book); 
}); 
// DELETE 
app.delete("/api/books/:id", (req, res) => { 
const index = books.findIndex((b) => b.id === Number(req.params.id)); 
if (index === -1) return res.status(404).json({ message: "Book not found" }); 
const removed = books.splice(index, 1)[0]; 
res.json({ message: "Book deleted successfully", book: removed }); 
}); 
const PORT = 
