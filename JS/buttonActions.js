let loginButton = document.getElementById('loginButton');
let loginModal = document.getElementById('loginModal');
let closeButton = document.getElementById('closeLogin');

loginButton.addEventListener('click', function() {
    loginModal.style.display = 'block';
    loginModal.style.opacity = '1';
    loginModal.style.transform = 'scale(1)';
    loginModal.showModal();
});

closeButton.addEventListener('click', function(event) {
    loginModal.style.opacity = '0';
    loginModal.style.transform = 'scale(0.9)';
    setTimeout(function() {
        loginModal.style.display = 'none';
    }, 300);
    loginModal.close();
});