let editIndex = null;

// Load books on page load
document.addEventListener("DOMContentLoaded", loadBooks);
// local storage
    let books = JSON.parse(localStorage.getItem("books")) || [];
// Add or Update Book
function addBook() {

    let name = document.getElementById("Bookname").value;
    let id = document.getElementById("BookId").value;
    let author = document.getElementById("Authorname").value;
    let year = document.getElementById("Publicationyear").value;

    if (name === "" || id === "" || author === "" || year === "") {
        alert("Please fill all fields!");
        return;
    }



    if (editIndex !== null) {
        // Update existing
        books[editIndex] = { name, id, author, year };
        editIndex = null;
        document.querySelector("button").innerText = "Add Book";
    } else {
        // Add new
        books.push({ name, id, author, year });
    }

    localStorage.setItem("books", JSON.stringify(books));

    resetForm();
    loadBooks();
}

// Display all books
function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let table = document.getElementById("BookTable");

    table.innerHTML = `
    
        <tr>
            <th>Book Name</th>
            <th>Book ID</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>Action</th>
        </tr>
    `;

    books.forEach((book, index) => {
        let row = `
        <tr>
            <td>${book.name}</td>
            <td>${book.id}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>
                <button onclick="editBook(${index})"> Edit</button>
                <button onclick="deleteBook(${index})" style="color:red;"> Delete</button>
            </td>
        </tr>`;
        
        table.innerHTML += row;
    });
}

// Delete Book
function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];

    if (confirm("Are you sure you want to delete this book?")) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        loadBooks();
    }
}

// Edit Book
function editBook(index) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let book = books[index];

    document.getElementById("Bookname").value = book.name;
    document.getElementById("BookId").value = book.id;
    document.getElementById("Authorname").value = book.author;
    document.getElementById("Publicationyear").value = book.year;

    editIndex = index;
    document.querySelector("button").innerText = "Update Book";
}

// Reset Form
function resetForm() {
    document.getElementById("Bookname").value = "";
    document.getElementById("BookId").value = "";
    document.getElementById("Authorname").value = "";
    document.getElementById("Publicationyear").value = "";
}




//search button

function searchBook() {
    let input = document.getElementById("search").value.toLowerCase();
    let table = document.getElementById("BookTable");
    let rows = table.getElementsByTagName("tr");

    // Loop table rows (skip header at index 0)
    for (let i = 1; i < rows.length; i++) {
        let columns = rows[i].getElementsByTagName("td");
        let match = false;

        // Check every column for search
        for (let col = 0; col < columns.length; col++) {
            if (columns[col].innerText.toLowerCase().includes(input)) {
                match = true;
                break;
            }
        }

        // Show or hide row based on result
        rows[i].style.display = match ? "" : "none";
    }
}




//theme
// Apply Theme From LocalStorage on load
document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
});

// Toggle Theme Function
function toggleTheme() {
    document.body.classList.toggle("dark");

    // Save Theme State
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}
