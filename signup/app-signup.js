const signUpForm = document.querySelector(".singup-form");
const errorHandling = document.querySelector(".error");

// signUpForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   // data to send to server
//   // const config = {
//   //   email: e.target.elements.email.value,
//   //   password: e.target.elements.password.value,
//   // };
//   // console.log(config);

//   axios
//     .post("http://localhost:3333/auth/signup", config)
//     .then((res) => {
//       console.log(res.data.access_token);
//       // access_token from api
//       const accessToken = res.data.access_token;
//       // store on local storage
//       localStorage.setItem("access_token", accessToken);
//       // location.assign(`../users/user.html`);
//       signUpForm.reset();
//     })
//     .catch((error) =>
//       // errorHandling.textContent = res.
//       console.log(error)
//     );
// });

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewUser(e);
});

const createNewUser = async (data) => {
  //  data to send to api
  try {
    const config = {
      email: data.target.elements.email.value,
      password: data.target.elements.password.value,
    };
    const res = await axios.post("http://localhost:3333/auth/signup", config);
    const accessToken = res.data.access_token;
    localStorage.setItem("accessToken", accessToken);
    location.assign("../users/user.html");
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    errorHandling.textContent = `Error: ${error.response.data.message}`;
  }
};

// 👇 AXIOS COMING SOON

// const createNewUser = async (data) => {
//   //  data to send to api
//   const config = {
//     email: data.target.elements.email.value,
//     password: data.target.elements.password.value,
//   };
//   try {
//     const res = await fetch("http://localhost:3333/auth/signup", {
//       method: "POST",
//       body: JSON.stringify(config),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const json = await res.json();

//     if (!res.ok) {
//       errorHandling.textContent = `Error: ${json.message}`;
//     }
//     if (res.ok) {
//       // console.log(json);
//       // console.log(accessToken);
//       const accessToken = json;
//       localStorage.setItem("accessToken", JSON.stringify(accessToken));
//       location.assign("../users/user.html");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// // 👇 AXIOS COMING SOON
// // const res = await axios.post("http://localhost:3333/auth/signup", config);
// // console.log(res.access_token);
