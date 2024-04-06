// Select the form and dialog elements
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('registerAccount');
const lModal = document.getElementById('loginModal');
const rModal = document.getElementById('registerModal');
let loginSuccessModal = document.getElementById('loginSuccessModal');
let registerSuccessModal = document.getElementById('registerSuccessModal');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('salasana').value;
    const response = await fetch('http://localhost:3000/login', {
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
        loginSuccessModal.style.backgroundColor = 'green';
    } else {
        // Display error message
        document.getElementById('loginErrorMessage').textContent = data.message;
    }
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('rUsername').value;
    const password = document.getElementById('rSalasana').value;

    const response = await fetch('http://localhost:3000/register', {
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
        registerSuccessModal.style.backgroundColor = 'green';
    } else {
        // Display error message
        document.getElementById('registerErrorMessage').textContent = data.message;
    }
});

// Add event listeners to close the success modals
document.getElementById('closeLoginSuccess').addEventListener('click', function() {
    loginSuccessModal.close();
});

document.getElementById('closeRegisterSuccess').addEventListener('click', function() {
    registerSuccessModal.close();
});