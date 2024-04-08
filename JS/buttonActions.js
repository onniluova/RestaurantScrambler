//Login modalin toiminta
let loginButton = document.getElementById('loginButton');
let loginModal = document.getElementById('loginModal');
let closeButton = document.getElementById('closeLogin');
let switchToRegister = document.getElementById('openRegister');

loginButton.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'inline-block';
    loginModal.showModal();
});

switchToRegister.addEventListener('click', function(e) {
    e.preventDefault();
    registerModal.style.display = 'inline-block';
    loginModal.style.display = 'none';
    loginModal.close();
    registerModal.showModal();
});

closeButton.addEventListener('click', function(e) {
    e.preventDefault();
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
    if (sessionStorage.getItem('data')) {
        let userData = JSON.parse(sessionStorage.getItem('data'));
        let usernameLogged = userData.data.username;
        console.log("User logged out:", usernameLogged);
        localStorage.removeItem(usernameLogged);
        localStorage.removeItem(usernameLogged + 'favorite');
        localStorage.removeItem('favorites');
        localStorage.removeItem('usernameLogged');

        usernameBox.textContent = '';
        favoriteRestaurant.textContent = '';

        loginButton.style.display = 'block';
        registerBtn.style.display = 'block';

        this.style.display = 'none';

        sessionStorage.removeItem('data');
    } else {
        console.log("No user is currently logged in.");
    }
});