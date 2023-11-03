const signUpForm = document.querySelector(".singup-form");
const success = document.querySelector(".success");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // data to send to server
  const config = {
    email: e.target.elements.email.value,
    password: e.target.elements.password.value,
  };
  console.log(config);

  axios
    .post("http://localhost:3333/auth/signup", config)
    .then((res) => {
      console.log(res.data.access_token);
      // access_token from api
      const accessToken = res.data.access_token;
      // store on local storage
      localStorage.setItem("access_token", accessToken);
      location.assign(`user.html`);
      signUpForm.reset();
    })
    .catch((error) => console.log(error));
});

// success.textContent =
//   "you have successfully create aaccount 😊. click here to";

// location.assign(`users.html#${accessToken}`);
