const loginForm = document.querySelector(".login-form");
const errorHandling = document.querySelector(".error");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userLogin(e);
});

const userLogin = async (data) => {
  try {
    const config = {
      email: data.target.elements.email.value,
      password: data.target.elements.password.value,
    };
    // console.log(config);

    const res = await axios.post("http://localhost:3333/auth/signin", config);
    const accessTokenForLogin = res.data.access_token;
    localStorage.setItem("loginAccessToken", accessTokenForLogin);
    location.assign("../users/user.html");
    loginForm.reset();
  } catch (error) {
    console.log(error);
    errorHandling.textContent = `Error: ${error.response.data.message}`;
  }
};
