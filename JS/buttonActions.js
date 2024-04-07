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

let logoutButton = document.getElementById('logoutButton');

if (localStorage.getItem('usernameLogged')) {
    loginButton.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutButton.style.display = 'block';
}
logoutButton.addEventListener('click', function() {
    let usernameLogged = localStorage.getItem('usernameLogged');
    localStorage.removeItem(usernameLogged);
    localStorage.removeItem(usernameLogged + 'favorite');
    localStorage.removeItem('favorites');
    localStorage.removeItem('usernameLogged');

    document.getElementById('usernameBox').textContent = '';
    document.getElementById('favoriteRestaurant').textContent = '';

    loginButton.style.display = 'block';
    registerBtn.style.display = 'block';

    this.style.display = 'none';
});