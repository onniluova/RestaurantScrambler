const form = document.getElementById("registerAccount");
const signupMessage = document.getElementById("registerErrorMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form.rUsername.value;
    const email = form.rEmail.value;
    const password = form.rSalasana.value;
    const confirmPassword = form.rConfirmSalasana.value;
    if (password !== confirmPassword) {
        signupMessage.innerHTML = "Passwords do not match!";
    } else {
        signup(username, email, password);
    }
});

async function signup(username, email, password) {
    const response = await fetch("https://10.120.32.94/restaurant/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    });

    let data = await response.json();
    if (response.ok) {
        signupMessage.innerHTML = "Signup successful!";
        signupMessage.style.color = "green";
        sessionStorage.setItem("data", JSON.stringify(data));
    } else {
        if (data.message) {
            signupMessage.innerHTML = data.message;
            signupMessage.style.color = "red";
        } else if (data.issues[0].message) {
            signupMessage.innerHTML = data.issues[0].message;
            signupMessage.style.color = "red";
        }
    }
}

closeRegister.addEventListener('click', function(event) {
    document.getElementById("registerAccount").reset();
    document.getElementById("registerErrorMessage").innerHTML = '';
});