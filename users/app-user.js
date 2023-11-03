const logoutBtn = document.querySelector(".logoutBtn");
const accessToken = localStorage.getItem("accessToken");

// logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("accessToken");
  location.assign("../login/login.html");
});

// location
console.log(accessToken);
if (!accessToken) {
  location.assign("../login/login.html");
}
console.log("yes");
