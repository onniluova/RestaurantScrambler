let profiili = document.getElementById('profiili');
let profiiliModal = document.getElementById('profileModal');
let closeProfile = document.getElementById('closeProfile');
let usernameBox = document.getElementById('usernameBox');
let favoriteRestaurant = document.getElementById('favoriteRestaurant');

profiili.addEventListener('click', function() {
    let userData = JSON.parse(sessionStorage.getItem('data'));
    console.log("User data:", userData); // Debugging line

    let favoriteRestaurantData = JSON.parse(localStorage.getItem('favorite'));
    if (userData) {
        usernameBox.textContent = userData.data.username;
        console.log("Username box content:", usernameBox.textContent); // Debugging line
        if (favoriteRestaurantData) {
            favoriteRestaurant.textContent = favoriteRestaurantData.name; // Change this line
            console.log("Favorite restaurant:", favoriteRestaurant.textContent); // Debugging line
        }
    }
    profiiliModal.style.display = 'inline-block';
    profiiliModal.showModal();
});
closeProfile.addEventListener('click', function() {
    profiiliModal.style.display = 'none';
    profiiliModal.close();
});