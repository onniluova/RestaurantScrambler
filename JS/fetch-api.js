// Select the form and dialog elements
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('registerAccount');
const lModal = document.getElementById('loginModal');
const rModal = document.getElementById('registerModal');
let loginSuccessModal = document.getElementById('loginSuccessModal');
let registerSuccessModal = document.getElementById('registerSuccessModal');

let usernameLogged;

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('salasana').value;
    const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
        console.log('User logged in');
        lModal.style.display = 'none';
        lModal.close();
        loginSuccessModal.showModal();
        loginSuccessModal.style.backgroundColor = 'yellow';
        usernameLogged = username;
        localStorage.setItem('usernameLogged', usernameLogged);

        loginButton.style.display = 'none';
        registerBtn.style.display = 'none';

        logoutButton.style.display = 'block';
    } else {
        // Display error message
        document.getElementById('loginErrorMessage').textContent = data.message;
    }
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (rModal.style.display === 'none') {
        event.preventDefault();
        return;
    }

    const username = document.getElementById('rUsername').value;
    const password = document.getElementById('rSalasana').value;

    const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
        console.log('User registered');
        rModal.style.display = 'none';
        rModal.close();
        registerSuccessModal.showModal();
        registerSuccessModal.style.backgroundColor = 'yellow';
    } else {
        document.getElementById('registerErrorMessage').textContent = data.message;
    }
});

document.getElementById('closeLoginSuccess').addEventListener('click', function() {
    loginSuccessModal.close();
});

document.getElementById('closeRegisterSuccess').addEventListener('click', function() {
    registerSuccessModal.close();
});

//Profiili modal
let profiiliAvaus = document.getElementById('profiili');
let profiiliModal = document.getElementById('profileModal');
let username = document.getElementById('usernameBox');
let closeProfile = document.getElementById('closeProfile');

profiiliAvaus.addEventListener('click', function() {
    profiiliModal.style.display = 'inline-block';
    username.textContent = usernameLogged;

    if (localStorage.getItem('favorite')) {
        let favoriteRestaurant = JSON.parse(localStorage.getItem('favorite'));

        let favoriteRestaurantElement = document.getElementById('favoriteRestaurant');
        favoriteRestaurantElement.textContent = `${favoriteRestaurant.name}`;
    }

    profiiliModal.showModal();
});

closeProfile.addEventListener('click', function(event) {
    profiiliModal.style.display = 'none';
    profiiliModal.close();
});