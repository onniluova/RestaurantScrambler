let profiili = document.getElementById('profiili');
let profiiliModal = document.getElementById('profileModal');
let closeProfile = document.getElementById('closeProfile');
let usernameBox = document.getElementById('usernameBox');
let favoriteRestaurant = document.getElementById('favoriteRestaurant');
let profilePictureInput = document.getElementById('profilePictureInput');
let profilePicture = document.getElementById('profilePicture');

profiili.addEventListener('click', function() {
    let userData = JSON.parse(sessionStorage.getItem('data'));
    let profilePictureData = sessionStorage.getItem('profilePicture');
    if (userData) {
        usernameBox.textContent = userData.data.username;
        if (profilePictureData) {
            profilePicture.src = profilePictureData;
        }
        profilePictureInput.disabled = false; // Enable the file input when the user is logged in
    } else {
        profilePictureInput.disabled = true; // Disable the file input when the user is not logged in
    }
    profiiliModal.style.display = 'inline-block';
    profiiliModal.showModal();

    let favoriteRestaurantData = JSON.parse(localStorage.getItem('favorite'));
    if (userData) {
        usernameBox.textContent = userData.data.username;
        console.log("Username box content:", usernameBox.textContent);
        if (favoriteRestaurantData) {
            favoriteRestaurant.textContent = favoriteRestaurantData.name;
            console.log("Favorite restaurant:", favoriteRestaurant.textContent);
        }
    }
    profiiliModal.style.display = 'inline-block';
    profiiliModal.showModal();
});

profilePictureInput.addEventListener('change', function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        let dataUrl = reader.result;
        let userData = JSON.parse(sessionStorage.getItem('data'));
        if (userData) {
            let username = userData.data.username;
            localStorage.setItem('profilePicture-' + username, dataUrl);
            profilePicture.src = dataUrl;
        }
    }
    if (file) {
        reader.readAsDataURL(file);
    }
});

closeProfile.addEventListener('click', function() {
    profiiliModal.style.display = 'none';
    profiiliModal.close();
});

