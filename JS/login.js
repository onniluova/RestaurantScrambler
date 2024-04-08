const loginForm = document.getElementById("login");

const loginMessage = document.getElementById("loginErrorMessage");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Form submitted");
    let username = loginForm.username.value;
    let password = loginForm.password.value;
    login(username, password);
});

async function login(username, password) {
    try {
        const response = await fetch(
            "https://10.120.32.94/restaurant/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        );

        let data = await response.json();

        if (response.ok) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("data", JSON.stringify(data));
            loginMessage.innerHTML = "Login successful!";
            loginMessage.style.color = "green";

            let loginButton = document.getElementById('loginButton');
            let registerButton = document.getElementById('registerButton');
            let logoutButton = document.getElementById('logoutButton');

            loginButton.style.display = 'none';
            registerButton.style.display = 'none';

            logoutButton.style.display = 'block';

            setTimeout(() => {
                loginModal.close();
                loginModal.style.display = 'none';
            }, 2000);
        } else {
            loginMessage.innerHTML = data.message + "!";
            loginMessage.style.color = "red";
        }

    }
    catch (error) {
        console.log(error);
    }
}

closeButton.addEventListener('click', function(e) {
    document.getElementById("login").reset();
    document.getElementById("loginErrorMessage").innerHTML = '';
});