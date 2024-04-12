let loginButton = document.getElementById('loginButton');
let loginModal = document.getElementById('loginModal');
let closeButton = document.getElementById('closeLogin');
let switchToRegister = document.getElementById('openRegister');
let logoutButton = document.getElementById('logoutButton');


//Register modalin toiminta
let registerBtn = document.getElementById('registerButton');
let registerModal = document.getElementById('registerModal');
let closeRegister = document.getElementById('closeRegister');
let switchToLogin = document.getElementById('switchToLogin');

loginButton.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById("login").reset();
    loginModal.style.display = 'inline-block';
    loginModal.style.opacity = "1";
    loginModal.showModal();
});

switchToRegister.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById("registerAccount").reset();
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

registerBtn.addEventListener('click', function() {
    document.getElementById("registerAccount").reset();
    registerModal.style.display = 'inline-block';
    registerModal.style.opacity = "1";
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

        profilePicture.src = '';
        profilePictureInput.value = '';

        loginButton.style.display = 'block';
        registerBtn.style.display = 'block';

        this.style.display = 'none';

        sessionStorage.clear();
    } else {
        console.log("No user is currently logged in.");
    }
});