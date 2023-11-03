// const loginForm = document.querySelector(".login-form");

// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const config = {
//     email: e.target.elements.email.value,
//     password: e.target.elements.password.value,
//   };
//   console.log(config);

//   axios
//     .post("http://localhost:3333/auth/signin", config)
//     .then((res) => console.log(res))
//     .catch((error) => console.log(error));
// });

const accessToken = localStorage.getItem("access_token");

if (!accessToken) {
  location.assign("index.html");
} else {
  document.querySelector(".h").textContent = "it's work ";
}
