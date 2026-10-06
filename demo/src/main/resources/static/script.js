// LOGIN

document.getElementById("loginForm")?.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("loginUsername").value;

    const password =
        document.getElementById("loginPassword").value;

    fetch("/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    })

    .then(response => response.text())

    .then(data => {

        document.getElementById("loginMessage").innerText = data;

        if (data === "Login successful") {

        window.location.href = "dashboard.html";
        }

    })

    .catch(error => {

        console.error(error);

        document.getElementById("loginMessage").innerText =
            "Something went wrong";
    });

});


// REGISTER

document.getElementById("registerForm")?.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("registerUsername").value;

    const password =
        document.getElementById("registerPassword").value;

    fetch("/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    })

    .then(response => response.text())

    .then(data => {

        document.getElementById("registerMessage").innerText = data;

        if (data === "Registration successful") {

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        }

    })

    .catch(error => {

        console.error(error);

        document.getElementById("registerMessage").innerText =
            "Something went wrong";
    });

});