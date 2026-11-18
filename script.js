const form = document.getElementById("book-form"); 
const list = document.getElementById("book-list"); 
// Get all books from the API and show them 
async function loadBooks() { 
const response = await fetch("/api/books"); 
const books = await response.json(); 
 
  list.innerHTML = ""; 
  books.forEach((book) => { 
    const li = document.createElement("li"); 
    li.className = "list-group-item d-flex justify-content-between align-items-center"; 
    li.textContent = `${book.title} by ${book.author} (${book.year})`; 
 
    const deleteBtn = document.createElement("button"); 
    deleteBtn.className = "btn btn-danger btn-sm"; 
    deleteBtn.textContent = "Delete"; 
    deleteBtn.onclick = async () => { 
      await fetch(`/api/books/${book.id}`, { method: "DELETE" }); 
      loadBooks(); 
    }; 
 
    li.appendChild(deleteBtn); 
    list.appendChild(li); 
  }); 
} 
 
// Add a new book when the form is submitted 
form.addEventListener("submit", async (event) => { 
  event.preventDefault(); // stop the page from reloading 
 
  const newBook = { 
    title: document.getElementById("title").value, 
    author: document.getElementById("author").value, 
    year: document.getElementById("year").value, 
  }; 
 
  await fetch("/api/books", { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(newBook), 
  }); 
 
  form.reset(); 
  loadBooks(); 
}); 
 
loadBooks(); // show books when the page opens
