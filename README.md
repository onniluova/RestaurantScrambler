# RestaurantScrambler
![image](https://github.com/user-attachments/assets/1bd08908-a643-46f1-bd47-f51f58820ec8)

Restaurant Scrambler is a web application that allows users to view menus from various restaurants. The application is built with JavaScript and uses CSS for styling. Data retrieval is handled via a REST API. The application requires a Metropolia VPN connection. The API for the app is deprecated, hence the map is not showing.

# User Guide

- Login and Registration: The top navigation bar contains "Login" and "Register" buttons. Logging in requires entering a username and password in the pop-up window. Registering requires providing a username, email address, and password.

- Restaurant Search: In the center of the application, there is a "Search for a restaurant by name" button. Clicking this button opens a search function where you can enter the desired restaurant's name.

- Restaurant Information: Clicking on a restaurant from the search results opens its details, including daily and weekly menus.

- Saving Favorite Restaurants: In the restaurant details window, there is a "Favorite" button. Clicking this button saves the restaurant as a favorite, and its details can be accessed from the user's profile.

- Profile: The top navigation bar includes a "Profile" button, where users can view their personal information. The profile also displays saved favorite restaurants.
  Functionality

The application retrieves restaurant data via a REST API. JavaScript handles data fetching and processing. User actions, such as logging in, registering, and saving favorite restaurants, are stored in the browser's local storage. Restaurant information is displayed using a map implemented with the Leaflet library, where restaurants appear as markers. Clicking a marker opens the restaurant's details. The application's design is defined using CSS, and responsiveness is achieved with CSS media queries to adapt the layout to different screen sizes.
