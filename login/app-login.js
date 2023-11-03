const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userLogin(e);
  loginForm.reset();
});

const userLogin = async (data) => {
  try {
    const config = {
      email: data.target.elements.email.value,
      password: data.target.elements.password.value,
    };
    // console.log(config);

    const res = await axios.post("http://localhost:3333/auth/signin", config);
    // console.log(res);
    // if (res.ok) {
    // console.log(res.data.access_token);
    const accessTokenForLogin = res.data.access_token;
    localStorage.setItem("loginAccessToken", accessTokenForLogin);
    location.assign("../users/user.html");
    // }
  } catch (error) {
    console.log(error);
  }
};
