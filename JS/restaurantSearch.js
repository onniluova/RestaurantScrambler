import { fetchData } from './dataFetch.js';

const baseUrl = "https://10.120.32.94/restaurant/api/v1/restaurants";

let searchButton = document.getElementById('openSearch'); // Replace 'searchButton' with the id of the button that should open the search modal
let searchModal = document.getElementById('searchModal');
let closeSearch = document.getElementById('closeSearch');
let searchForm = document.getElementById('searchForm');
let searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', function() {
    searchModal.style.display = 'inline-block';
    searchModal.showModal();
});

closeSearch.addEventListener('click', function() {
    searchModal.style.display = 'none';
    searchModal.close();
});

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let searchQuery = searchInput.value;
    searchRestaurants(searchQuery);
});

async function searchRestaurants(query) {
    const restaurants = await fetchData(baseUrl);

    let lowerCaseQuery = query.toLowerCase();

    let matchingRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(lowerCaseQuery));

    if (matchingRestaurants.length === 0) {
        matchingRestaurants = restaurants.sort((a, b) => {
            let aDistance = levenshteinDistance(lowerCaseQuery, a.name.toLowerCase());
            let bDistance = levenshteinDistance(lowerCaseQuery, b.name.toLowerCase());
            return aDistance - bDistance;
        });
        matchingRestaurants = matchingRestaurants.slice(0, 5);
    }

    let restaurantList = document.getElementById('restaurantList');

    restaurantList.innerHTML = '';

    matchingRestaurants.forEach(restaurant => {
        let listItem = document.createElement('li');
        listItem.textContent = restaurant.name;
        listItem.addEventListener('click', function() {
            displayRestaurantDetails(restaurant);
        });
        restaurantList.appendChild(listItem);
    });
}

// Funktio laskee kahden merkkijonon välisen etäisyyden
function levenshteinDistance(a, b) {
    const matrix = [];

    let x = a.length;
    let y = b.length;

    for(let i = 0; i <= x; i++){
        matrix[i] = [i];
    }

    for(let j = 0; j <= y; j++){
        matrix[0][j] = j;
    }

    for(let i = 1; i <= x; i++){
        for(let j = 1; j <= y; j++){
            if(a.charAt(i-1) == b.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1,
                    Math.min(matrix[i][j-1] + 1,
                        matrix[i-1][j] + 1));
            }
        }
    }

    return matrix[x][y];
}

async function displayRestaurantDetails(restaurant) {
    let restaurantDetails = document.getElementById('restaurantDetails');

    restaurantDetails.innerHTML = '';

    let name = document.createElement('p');
    name.textContent = 'Name: ' + restaurant.name;
    restaurantDetails.appendChild(name);

    let address = document.createElement('p');
    address.textContent = 'Address: ' + restaurant.address;
    restaurantDetails.appendChild(address);

    let dailyMenu = await fetchData(`${baseUrl}/daily/${restaurant._id}/fi`);
    let weeklyMenu = await fetchData(`${baseUrl}/weekly/${restaurant._id}/fi`);

    let dailyMenuElement = document.getElementById('dailyMenu');
    let weeklyMenuElement = document.getElementById('weeklyMenu');

    dailyMenuElement.innerHTML = '';
    weeklyMenuElement.innerHTML = '';

    let dailyMenuTitle = document.createElement('h2');
    dailyMenuTitle.textContent = 'Daily Menu';
    dailyMenuElement.appendChild(dailyMenuTitle);
    dailyMenu.courses.forEach(course => {
        let menuItem = document.createElement('p');
        let diets = Array.isArray(course.diets) ? course.diets.join(', ') : 'Dieetit ei saatavilla';
        let courseName = course.name ? course.name : '';
        let coursePrice = course.price ? course.price : '';
        menuItem.textContent = `${courseName} - ${coursePrice} - Diets: ${diets}`;
        dailyMenuElement.appendChild(menuItem);
    });

    let weeklyMenuTitle = document.createElement('h2');
    weeklyMenuTitle.textContent = 'Weekly Menu';
    weeklyMenuElement.appendChild(weeklyMenuTitle);
    weeklyMenu.days.forEach(day => {
        let dayTitle = document.createElement('h3');
        dayTitle.textContent = day.date;
        weeklyMenuElement.appendChild(dayTitle);
        day.courses.forEach(course => {
            let menuItem = document.createElement('p');
            let diets = Array.isArray(course.diets) ? course.diets.join(', ') : 'Dieetit ei saatavilla';
            let courseName = course.name ? course.name : '';
            let coursePrice = course.price ? course.price : '';
            menuItem.textContent = `${courseName} - ${coursePrice} - Diets: ${diets}`;
            weeklyMenuElement.appendChild(menuItem);
        });
    });
}