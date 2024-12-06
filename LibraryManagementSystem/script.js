document.addEventListener('DOMContentLoaded', () => {
    // Simulated database
    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' }
    ];

    const books = [
        { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', available: true },
        { id: 2, title: '1984', author: 'George Orwell', available: true },
        { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', available: false }
    ];

    let currentUser = null;

    // DOM elements
    const mainContent = document.getElementById('main-content');
    const navLogin = document.getElementById('nav-login');
    const navSearch = document.getElementById('nav-search');
    const navIssue = document.getElementById('nav-issue');
    const navReturn = document.getElementById('nav-return');
    const navAddBook = document.getElementById('nav-add-book');
    const navUserManagement = document.getElementById('nav-user-management');
    const navLogout = document.getElementById('nav-logout');

    // Event listeners
    navLogin.addEventListener('click', showLoginForm);
    navSearch.addEventListener('click', showSearchForm);
    navIssue.addEventListener('click', showIssueForm);
    navReturn.addEventListener('click', showReturnForm);
    navAddBook.addEventListener('click', showAddBookForm);
    navUserManagement.addEventListener('click', showUserManagementForm);
    navLogout.addEventListener('click', logout);

    function showLoginForm() {
        mainContent.innerHTML = `
            <h2>Login</h2>
            <form id="login-form">
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
        `;
        document.getElementById('login-form').addEventListener('submit', handleLogin);
    }

    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            updateNavigation();
            showWelcomeMessage();
        } else {
            alert('Invalid username or password');
        }
    }

    function updateNavigation() {
        navLogin.classList.add('hidden');
        navSearch.classList.remove('hidden');
        navIssue.classList.remove('hidden');
        navReturn.classList.remove('hidden');
        navLogout.classList.remove('hidden');
        if (currentUser.role === 'admin') {
            navAddBook.classList.remove('hidden');
            navUserManagement.classList.remove('hidden');
        }
    }

    function showWelcomeMessage() {
        mainContent.innerHTML = `<h2>Welcome, ${currentUser.username}!</h2>`;
    }

    function showSearchForm() {
        mainContent.innerHTML = `
            <h2>Search Books</h2>
            <form id="search-form">
                <input type="text" id="search-query" placeholder="Enter book title or author" required>
                <button type="submit">Search</button>
            </form>
            <div id="search-results"></div>
        `;
        document.getElementById('search-form').addEventListener('submit', handleSearch);
    }

    function handleSearch(e) {
        e.preventDefault();
        const query = document.getElementById('search-query').value.toLowerCase();
        const results = books.filter(book => 
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
        );
        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        const resultsDiv = document.getElementById('search-results');
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No books found.</p>';
            return;
        }
        let html = '<table><tr><th>Title</th><th>Author</th><th>Available</th><th>Action</th></tr>';
        results.forEach(book => {
            html += `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.available ? 'Yes' : 'No'}</td>
                    <td>${book.available ? `<button onclick="issueBook(${book.id})">Issue</button>` : 'Not Available'}</td>
                </tr>
            `;
        });
        html += '</table>';
        resultsDiv.innerHTML = html;
    }

    window.issueBook = function(bookId) {
        const book = books.find(b => b.id === bookId);
        if (book && book.available) {
            book.available = false;
            alert(`Book "${book.title}" has been issued successfully.`);
            showSearchForm(); // Refresh the search results
        } else {
            alert('Error issuing the book. Please try again.');
        }
    };

    function showIssueForm() {
        mainContent.innerHTML = `
            <h2>Issue Book</h2>
            <form id="issue-form">
                <select id="book-select" required>
                    <option value="">Select a book</option>
                    ${books.filter(book => book.available).map(book => 
                        `<option value="${book.id}">${book.title}</option>`
                    ).join('')}
                </select>
                <input type="date" id="issue-date" required>
                <input type="date" id="return-date" required>
                <textarea id="remarks" placeholder="Remarks (optional)"></textarea>
                <button type="submit">Issue Book</button>
            </form>
        `;
        const issueForm = document.getElementById('issue-form');
        const issueDate = document.getElementById('issue-date');
        const returnDate = document.getElementById('return-date');
        
        // Set minimum date for issue date
        const today = new Date().toISOString().split('T')[0];
        issueDate.min = today;
        issueDate.value = today;
        
        // Set default and minimum date for return date
        issueDate.addEventListener('change', () => {
            const selectedDate = new Date(issueDate.value);
            const maxReturnDate = new Date(selectedDate);
            maxReturnDate.setDate(maxReturnDate.getDate() + 15);
            returnDate.min = issueDate.value;
            returnDate.max = maxReturnDate.toISOString().split('T')[0];
            returnDate.value = maxReturnDate.toISOString().split('T')[0];
        });
        
        // Trigger change event to set initial return date
        issueDate.dispatchEvent(new Event('change'));
        
        issueForm.addEventListener('submit', handleIssueBook);
    }

    function handleIssueBook(e) {
        e.preventDefault();
        const bookId = document.getElementById('book-select').value;
        const issueDate = document.getElementById('issue-date').value;
        const returnDate = document.getElementById('return-date').value;
        const remarks = document.getElementById('remarks').value;
        
        if (!bookId || !issueDate || !returnDate) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const book = books.find(b => b.id === parseInt(bookId));
        if (book && book.available) {
            book.available = false;
            alert(`Book "${book.title}" has been issued successfully.`);
            showIssueForm(); // Refresh the form
        } else {
            alert('Error issuing the book. Please try again.');
        }
    }

    function showReturnForm() {
        mainContent.innerHTML = `
            <h2>Return Book</h2>
            <form id="return-form">
                <select id="book-select" required>
                    <option value="">Select a book</option>
                    ${books.filter(book => !book.available).map(book => 
                        `<option value="${book.id}">${book.title}</option>`
                    ).join('')}
                </select>
                <input type="text" id="author" readonly>
                <input type="text" id="serial-no" placeholder="Serial Number" required>
                <input type="date" id="issue-date" readonly>
                <input type="date" id="return-date" required>
                <button type="submit">Return Book</button>
            </form>
        `;
        const returnForm = document.getElementById('return-form');
        const bookSelect = document.getElementById('book-select');
        const authorInput = document.getElementById('author');
        const issueDateInput = document.getElementById('issue-date');
        const returnDateInput = document.getElementById('return-date');
        
        bookSelect.addEventListener('change', () => {
            const selectedBook = books.find(b => b.id === parseInt(bookSelect.value));
            if (selectedBook) {
                authorInput.value = selectedBook.author;
                // Simulating an issue date 15 days ago
                const issueDate = new Date();
                issueDate.setDate(issueDate.getDate() - 15);
                issueDateInput.value = issueDate.toISOString().split('T')[0];
                returnDateInput.value = new Date().toISOString().split('T')[0];
                returnDateInput.min = issueDateInput.value;
            }
        });
        
        returnForm.addEventListener('submit', handleReturnBook);
    }

    function handleReturnBook(e) {
        e.preventDefault();
        const bookId = document.getElementById('book-select').value;
        const serialNo = document.getElementById('serial-no').value;
        const returnDate = document.getElementById('return-date').value;
        
        if (!bookId || !serialNo || !returnDate) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const book = books.find(b => b.id === parseInt(bookId));
        if (book && !book.available) {
            book.available = true;
            alert(`Book "${book.title}" has been returned successfully.`);
            showReturnForm(); // Refresh the form
        } else {
            alert('Error returning the book. Please try again.');
        }
    }

    function showAddBookForm() {
        if (currentUser.role !== 'admin') {
            alert('You do not have permission to access this feature.');
            return;
        }
        mainContent.innerHTML = `
            <h2>Add Book</h2>
            <form id="add-book-form">
                <input type="text" id="title" placeholder="Book Title" required>
                <input type="text" id="author" placeholder="Author" required>
                <select id="type" required>
                    <option value="book">Book</option>
                    <option value="movie">Movie</option>
                </select>
                <button type="submit">Add Book</button>
            </form>
        `;
        document.getElementById('add-book-form').addEventListener('submit', handleAddBook);
    }

    function handleAddBook(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const type = document.getElementById('type').value;
        
        if (!title || !author) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const newBook = {
            id: books.length + 1,
            title,
            author,
            type,
            available: true
        };
        books.push(newBook);
        alert(`${type === 'book' ? 'Book' : 'Movie'} "${title}" has been added successfully.`);
        showAddBookForm(); // Refresh the form
    }

    function showUserManagementForm() {
        if (currentUser.role !== 'admin') {
            alert('You do not have permission to access this feature.');
            return;
        }
        mainContent.innerHTML = `
            <h2>User Management</h2>
            <form id="user-management-form">
                <select id="user-type" required>
                    <option value="new">New User</option>
                    <option value="existing">Existing User</option>
                </select>
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password">
                <select id="role">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        `;
        document.getElementById('user-management-form').addEventListener('submit', handleUserManagement);
    }

    function handleUserManagement(e) {
        e.preventDefault();
        const userType = document.getElementById('user-type').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        
        if (!username) {
            alert('Please enter a username.');
            return;
        }
        
        if (userType === 'new') {
            if (!password) {
                alert('Please enter a password for the new user.');
                return;
            }
            users.push({ username, password, role });
            alert(`New user "${username}" has been added successfully.`);
        } else {
            const existingUser = users.find(u => u.username === username);
            if (existingUser) {
                if (password) existingUser.password = password;
                existingUser.role = role;
                alert(`User "${username}" has been updated successfully.`);
            } else {
                alert(`User "${username}" not found.`);
            }
        }
        showUserManagementForm(); // Refresh the form
    }

    function logout() {
        currentUser = null;
        navLogin.classList.remove('hidden');
        navSearch.classList.add('hidden');
        navIssue.classList.add('hidden');
        navReturn.classList.add('hidden');
        navAddBook.classList.add('hidden');
        navUserManagement.classList.add('hidden');
        navLogout.classList.add('hidden');
        showLoginForm();
    }

    // Initialize the application
    showLoginForm();
});

