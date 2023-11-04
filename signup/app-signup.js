const signUpForm = document.querySelector(".singup-form");
const errorHandling = document.querySelector(".error");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewUser(e);
  signUpForm.reset();
});

const createNewUser = async (data) => {
  try {
    //  data to send to api
    const config = {
      email: data.target.elements.email.value,
      password: data.target.elements.password.value,
    };
    // prepare data to send to api
    const res = await axios.post("http://localhost:3333/auth/signup", config);
    //
    const accessToken = res.data.access_token;
    // save access token
    localStorage.setItem("accessToken", accessToken);
    // redirect to user page
    location.assign("../users/user.html");
  } catch (error) {
    // show error on page
    errorHandling.textContent = `Error: ${error.response.data.message}`;
  }
};
