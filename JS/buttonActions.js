//Login modalin toiminta
let loginButton = document.getElementById('loginButton');
let loginModal = document.getElementById('loginModal');
let closeButton = document.getElementById('closeLogin');
let switchToRegister = document.getElementById('openRegister');

loginButton.addEventListener('click', function() {
    loginModal.style.display = 'inline-block';
    loginModal.showModal();
});

switchToRegister.addEventListener('click', function() {
    registerModal.style.display = 'inline-block';
    loginModal.style.display = 'none';
    loginModal.close();
    registerModal.showModal();
});

closeButton.addEventListener('click', function(event) {
    loginModal.style.display = 'none';
    loginModal.close();
});

let login = document.getElementById('login');
login.addEventListener('click', async function() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('salasana').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    // Handle login result
});

//Register modalin toiminta
let registerBtn = document.getElementById('registerButton');
let registerModal = document.getElementById('registerModal');
let closeRegister = document.getElementById('closeRegister');
let switchToLogin = document.getElementById('switchToLogin');

registerBtn.addEventListener('click', function() {
    registerModal.style.display = 'inline-block';
    registerModal.showModal();
});

switchToLogin.addEventListener('click', function() {
    loginModal.style.display = 'inline-block';
    registerModal.style.display = 'none';
    registerModal.close();
    loginModal.showModal();
});

closeRegister.addEventListener('click', function(event) {
    registerModal.style.display = 'none';
    registerModal.close();
});

let register = document.getElementById('registerAccount');
register.addEventListener('click', async function() {
    let username = document.getElementById('rUsername').value;
    let password = document.getElementById('rSalasana').value;
});