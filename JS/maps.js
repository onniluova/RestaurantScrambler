import { fetchData } from './dataFetch.js';

const restaurants = [];
const baseUrl = "https://10.120.32.94/restaurant/api/v1/restaurants";

async function getRestaurants() {
    const data = await fetchData(baseUrl);
    data.forEach((restaurant) => {
        restaurants.push(restaurant);
    });
    restaurants.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
}

let yellowIcon = L.icon({
    iconUrl: '../yellowmarker.png',
    iconSize: [30, 41],
    iconAnchor: [15, 25],
});

async function initMap() {
    await getRestaurants();

    let map = L.map('map').setView([60.1695, 24.9354], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    restaurants.forEach(restaurant => {
        let marker = L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]], {icon: yellowIcon}).addTo(map)
            .bindPopup(`<p class="popup-nimi">${restaurant.name}</p>
                    <p>Yritys: ${restaurant.company}</p>
                    <p>Kaupunki: ${restaurant.city}</p>
                    <button class="favorite-button" id="Favorite-${restaurant._id}">Suosikki</button>`)
            .openPopup();

        marker.restaurantData = restaurant;

        marker.on('click', async function() {
            async function getDailyMenu(id) {
                const data = await fetchData(`${baseUrl}/daily/${id}/fi`);
                return data;
            }

            let favoriteButton = document.getElementById(`Favorite-${restaurant._id}`);
            if (favorites.find(favorite => favorite._id === restaurant._id)) {
                this.getPopup().getElement().classList.add('favorite-popup');
                favoriteButton.textContent = "Poista suosikeista";
            } else {
                this.getPopup().getElement().classList.remove('favorite-popup');
                favoriteButton.textContent = "Suosikki";
            }

            favoriteButton.addEventListener('click', function() {
                let userData = JSON.parse(sessionStorage.getItem('data'));
                if (userData) {
                    let usernameLogged = userData.data.username;

                    if (!usernameLogged) {
                        alert("Sinun täytyy kirjautua sisään lisätäksesi suosikkeja.");
                        return;
                    }

                    let restaurant = marker.restaurantData;
                    let favoriteRestaurants = JSON.parse(localStorage.getItem(usernameLogged)) || [];

                    let index = favorites.findIndex(favorite => favorite._id === restaurant._id);
                    if (index !== -1) {
                        favorites.splice(index, 1);
                        this.textContent = "Suosikki";
                        setTimeout(() => {
                            this.closest('.leaflet-popup-content').classList.remove('favorite-popup');
                        }, 5);
                        localStorage.removeItem('favorite');
                    } else {
                        if (favorites.length > 0) {
                            alert("Sinulla voi olla vain yksi suosikki ravintola.");
                        } else {
                            favorites.push(restaurant);
                            this.textContent = "Poista suosikeista";
                            setTimeout(() => {
                                this.closest('.leaflet-popup-content').classList.add('favorite-popup');
                            }, 5);
                            localStorage.setItem('favorite', JSON.stringify(restaurant));
                        }
                    }
                    localStorage.setItem(usernameLogged, JSON.stringify(favoriteRestaurants));
                }
            });

            marker.on('popupopen', function() {
                if (favorites.find(favorite => favorite._id === restaurant._id)) {
                    this.getPopup().getElement().classList.add('favorite-popup');
                }
            });

            async function getWeeklyMenu(id) {
                const data = await fetchData(`${baseUrl}/weekly/${id}/fi`);
                console.log(data);
                return data;
            }

            let restaurantData = await getDailyMenu(restaurant._id);

            let restaurantDetails = this.restaurantData;
            let restaurantName =  restaurantDetails.name ? restaurantDetails.name : '';
            let restaurantAddress =  restaurantDetails.address ? restaurantDetails.address : '';

            let restaurantJson = JSON.stringify(restaurantData.courses);

            let restaurantSection = document.getElementById('menusBox');
            let ravintolanNimi = document.getElementById('ravintolanNimi');
            let ravintolanOsoite = document.getElementById('ravintolanOsoite');

            restaurantSection.innerHTML = '';
            ravintolanNimi.innerHTML = '';
            ravintolanOsoite.innerHTML = '';

            ravintolanNimi.innerHTML = restaurantName;
            ravintolanOsoite.innerHTML = restaurantAddress;

            let daily = document.createElement("p");
            daily.innerHTML = 'Päivän menu:';
            restaurantSection.appendChild(daily);

            restaurantData.courses.forEach(course => {
                let menuItem = document.createElement("p");

                let diets = Array.isArray(course.diets) ? course.diets.join(', ') : 'No diets available';
                let courseName = course.name ? course.name : '';
                let coursePrice = course.price ? course.price : '';
                let menuItemString = `${courseName} - ${coursePrice} - Diets: ${diets}`;

                menuItem.innerHTML = menuItemString;

                restaurantSection.appendChild(menuItem);
            });

            let oldWeeklyButton = document.getElementById('weeklyButton');
            let newWeeklyButton = oldWeeklyButton.cloneNode(true);
            oldWeeklyButton.parentNode.replaceChild(newWeeklyButton, oldWeeklyButton);

            let oldDailyButton = document.getElementById('dailyButton');
            let newDailyButton = oldDailyButton.cloneNode(true);
            oldDailyButton.parentNode.replaceChild(newDailyButton, oldDailyButton);

            newWeeklyButton.addEventListener('click', async function() {
                let weeklyMenuData = await getWeeklyMenu(restaurant._id);

                let restaurantSection = document.getElementById('menusBox');
                restaurantSection.innerHTML = '';

                if (Object.keys(weeklyMenuData).length === 0) {
                    let message = document.createElement("p");
                    message.innerHTML = 'Weekly menu not available';
                    restaurantSection.appendChild(message);
                } else {
                    let weekly = document.createElement("p");
                    weekly.innerHTML = 'Viikon menu:';
                    restaurantSection.appendChild(weekly);

                    weeklyMenuData.days.forEach(day => {
                        let table = document.createElement("table");

                        let thead = document.createElement("thead");
                        let headerRow = document.createElement("tr");
                        let headerCell = document.createElement("th");
                        headerCell.textContent = day.date;
                        headerRow.appendChild(headerCell);
                        thead.appendChild(headerRow);
                        table.appendChild(thead);

                        let tbody = document.createElement("tbody");

                        day.courses.forEach(course => {
                            let row = document.createElement("tr");

                            let nameCell = document.createElement("td");
                            let courseName = course.name ? course.name : '';
                            nameCell.textContent = courseName;
                            row.appendChild(nameCell);

                            let priceCell = document.createElement("td");
                            let coursePrice = course.price ? course.price : '';
                            priceCell.textContent = coursePrice;
                            row.appendChild(priceCell);

                            let dietsCell = document.createElement("td");
                            let diets = Array.isArray(course.diets) ? course.diets.join(', ') : 'No diets available';
                            dietsCell.textContent = diets;
                            row.appendChild(dietsCell);

                            tbody.appendChild(row);
                        });
                        table.appendChild(tbody);

                        let menusBox = document.getElementById('menusBox');
                        menusBox.appendChild(table);
                    });
                }
            });

            newDailyButton.addEventListener('click', async function() {
                let dailyMenuData = await getDailyMenu(restaurant._id);

                let restaurantSection = document.getElementById('menusBox');
                restaurantSection.innerHTML = '';

                let daily = document.createElement("p");
                daily.innerHTML = 'Päivän menu:';
                restaurantSection.appendChild(daily);

                dailyMenuData.courses.forEach(course => {
                    let menuItem = document.createElement("p");

                    let menuItemString = `${course.name} - ${course.price} - Diets: ${course.diets.join(', ')}`;

                    menuItem.innerHTML = menuItemString;

                    restaurantSection.appendChild(menuItem);
                });
            });
        });
    });

    map.setView([restaurants[0].location.coordinates[1], restaurants[0].location.coordinates[0]], 13);
}

initMap();