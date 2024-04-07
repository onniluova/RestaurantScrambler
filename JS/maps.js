const restaurants = [];

const baseUrl = "https://10.120.32.94/restaurant/api/v1/restaurants";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function getRestaurants() {
    const data = await fetchData(baseUrl);
    data.forEach((restaurant) => {
        restaurants.push(restaurant);
    });
    restaurants.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
}

async function initMap() {
    await getRestaurants();

    let map = L.map('map').setView([60.1695, 24.9354], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    restaurants.forEach(restaurant => {
        let marker = L.marker([restaurant.location.coordinates[1], restaurant.location.coordinates[0]]).addTo(map)
            .bindPopup(`<p>${restaurant.name}</p><button id="Favorite-${restaurant._id}">Suosikki</button>`)
            .openPopup();

        marker.restaurantData = restaurant;

        marker.on('click', async function() {

            async function getDailyMenu(id) {
                const data = await fetchData(`${baseUrl}/daily/${id}/fi`);
                return data;
            }

            marker.on('popupopen', function() {
                let favoriteButton = document.getElementById(`Suosikki-${restaurant._id}`);
                favoriteButton.addEventListener('click', function() {
                    favorites.push(restaurant);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                });
            });

            async function getWeeklyMenu(id) {
                const data = await fetchData(`${baseUrl}/weekly/${id}/fi`);
                console.log(data);
                return data;
            }

            let restaurantData = await getDailyMenu(restaurant._id);

            let restaurantDetails = this.restaurantData;
            let restaurantName =  restaurantDetails.name;
            let restaurantAddress =  restaurantDetails.address;

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
            daily.innerHTML = 'Daily menu:';
            restaurantSection.appendChild(daily);

            restaurantData.courses.forEach(course => {
                let menuItem = document.createElement("p");

                // Format the menu item data into a string
                let menuItemString = `${course.name} - ${course.price} - Diets: ${course.diets.join(', ')}`;

                menuItem.innerHTML = menuItemString;

                restaurantSection.appendChild(menuItem);
            });

            let weeklyMenuButton = document.getElementById('weeklyButton');
            let dailyMenuButton = document.getElementById('dailyButton');

            weeklyMenuButton.addEventListener('click', async function() {
                let weeklyMenuData = await getWeeklyMenu(restaurant._id);

                daily.innerHTML = '';

                let restaurantSection = document.getElementById('menusBox');
                restaurantSection.innerHTML = '';

                let weekly = document.createElement("p");
                weekly.innerHTML = 'Weekly menu:';
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
                        nameCell.textContent = course.name;
                        row.appendChild(nameCell);

                        let priceCell = document.createElement("td");
                        priceCell.textContent = course.price;
                        row.appendChild(priceCell);

                        let dietsCell = document.createElement("td");
                        dietsCell.textContent = course.diets.join(', ');
                        row.appendChild(dietsCell);

                        tbody.appendChild(row);
                    });
                    table.appendChild(tbody);

                    let menusBox = document.getElementById('menusBox');
                    menusBox.appendChild(table);
                });

                dailyMenuButton.addEventListener('click', async function() {
                    let dailyMenuData = await getDailyMenu(restaurant._id);

                    let restaurantSection = document.getElementById('menusBox');
                    restaurantSection.innerHTML = '';

                    let daily = document.createElement("p");
                    daily.innerHTML = 'Daily menu:';
                    restaurantSection.appendChild(daily);

                    dailyMenuData.courses.forEach(course => {
                        let menuItem = document.createElement("p");

                        // Format the menu item data into a string
                        let menuItemString = `${course.name} - ${course.price} - Diets: ${course.diets.join(', ')}`;

                        menuItem.innerHTML = menuItemString;

                        restaurantSection.appendChild(menuItem);
                    });
                });
            });
        });
    });

    map.setView([restaurants[0].location.coordinates[1], restaurants[0].location.coordinates[0]], 13);
}

initMap();
