const regForm = document.getElementById("register");
const loginForm = document.getElementById("login");

const baseUrl = "https://expense-dev-server.temanedtech.com";

regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
        name: regForm.name.value,
        email: regForm.email.value,
        phone: regForm.phone.value,
        password: regForm.password.value,
        access: regForm.access.value
    };

    fetch(baseUrl + "/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

loginForm.addEventListener("submit", async(event) => {
    try {
        event.preventDefault();
        const formData = {
            email: loginForm.email.value,
            password: loginForm.password.value
        }
        const res = await fetch(baseUrl+"/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        // localStorage.setItem("access", data.access);
        const keys = Object.keys(data);
        keys.forEach((e)=> localStorage.setItem(e, data[e]));
        window.location.assign("/expense.html");
    } catch (error) {
        console.log(error)
    }
})

// fetch(url, {
//     method: "POST",
//     headers: {

//     },
//     body: JSON.stringify({})
// })  
// AXIOS


// window.addEventListener("load", () => {

// })

window.onload = () => {
    const token = localStorage.getItem("token");
    if(token) {
        window.location.assign("/expense.html");
    }
}