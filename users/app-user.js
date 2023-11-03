const logoutBtn = document.querySelector(".logoutBtn");
const accessToken = localStorage.getItem("accessToken");
const loginAccessToken = localStorage.getItem("loginAccessToken");

// logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("loginAccessToken");
  location.assign("../login/login.html");
});

// location
if (!accessToken && !loginAccessToken) {
  location.assign("../login/login.html");
}
