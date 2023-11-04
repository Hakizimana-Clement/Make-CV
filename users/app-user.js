// buttons
const logoutBtn = document.querySelector(".logoutBtn");
const viewAllCVBtn = document.querySelector(".allCV");
const createCVBtn = document.querySelector(".createCV");
// form
const cvForm = document.querySelector(".cv-form");
// access token from local storage
const accessToken = localStorage.getItem("accessToken");
const loginAccessToken = localStorage.getItem("loginAccessToken");
// result on page
const errorHandling = document.querySelector(".error");
const success = document.querySelector(".success");
// container
const container = document.querySelector(".container");
const newContainer = document.querySelector(".newOne");
const allYourCv = document.querySelector(".all-your-CV");

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

// form
cvForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createCV(e);
});

const createCV = async (data) => {
  const config = {
    fullName: data.target.elements.fullName.value,
    email: data.target.elements.email.value,
    educationAndQualification: data.target.elements.education.value,
    skills: data.target.elements.skills.value,
    languages: data.target.elements.languages.value,
    certifications: data.target.elements.certifications.value,
    workExperience: data.target.elements.workExperience.value,
    hobbies: data.target.elements.hobbies.value,
    personalStatement: data.target.elements.personalStatement.value,
  };
  // console.log(config);

  try {
    const res = await axios.post(
      "http://localhost:3333/curriculum-vitaes",
      config,
      {
        headers: {
          Authorization: `Bearer ${loginAccessToken}`,
          "Content-Type": "application/json", // Adjust the content type as needed
        },
      }
    );
    cvForm.reset();
    success.textContent = "you successfully create cv";
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    const allError = error.response.data.message;
    // COMING SOON ERROR HANDLE
    // allError.forEach((e) => {
    //   console.log(e);
    //   if (data.target.elements.fullName.value.length === 0) {
    //   }
    // });
    errorHandling.textContent = error.response.data.message;
  }
};

createCVBtn.addEventListener("click", () => {
  container.style.display = "block";
  newContainer.style.display = "none";
});

// all you cv from api
viewAllCVBtn.addEventListener("click", async () => {
  // container
  container.style.display = "none";
  newContainer.style.display = "block";

  const res = await axios.get("http://localhost:3333/curriculum-vitaes", {
    headers: {
      Authorization: `Bearer ${loginAccessToken}`,
      "Content-Type": "application/json",
    },
  });
  console.log(res.data);
  const allCV = res.data;

  allCV.forEach((cv) => {
    // cv container
    const cvContainer = document.createElement("div");
    console.log(cv);

    // name
    const fullNameParagrahEl = document.createElement("p");
    fullNameParagrahEl.textContent = `Name: ${cv.fullName}`;
    cvContainer.append(fullNameParagrahEl);

    // email
    const emailEl = document.createElement("p");
    emailEl.textContent = `Email Address: ${cv.email} `;
    cvContainer.append(emailEl);

    // educationAndQualification
    const educationAndQualificationEl = document.createElement("p");
    educationAndQualificationEl.textContent = `Education and Qualification: ${cv.educationAndQualification}`;
    cvContainer.append(educationAndQualificationEl);

    // certification
    const certificationsEl = document.createElement("p");
    certificationsEl.textContent = `certifications : ${cv.certifications} `;
    cvContainer.append(certificationsEl);

    // hobbiesAndInterests
    const hobbiesAndInterestsEl = document.createElement("p");
    hobbiesAndInterestsEl.textContent = `Hobbies and interests : ${cv.hobbiesAndInterests} `;
    cvContainer.append(hobbiesAndInterestsEl);

    // languages
    const languagesEL = document.createElement("p");
    languagesEL.textContent = `Languages : ${cv.languages} `;
    cvContainer.append(languagesEL);
    // personalStatement
    const personalStatementEl = document.createElement("p");
    personalStatementEl.textContent = `Personal statement : ${cv.personalStatement} `;
    cvContainer.append(personalStatementEl);

    // skills
    const skills = document.createElement("p");
    skills.textContent = `Skills : ${cv.skills} `;
    cvContainer.append(skills);

    // workExperience
    const workExperienceEl = document.createElement("p");
    workExperienceEl.textContent = `WorkExperience : ${cv.workExperience} `;
    cvContainer.append(workExperienceEl);

    // container
    allYourCv.append(cvContainer);
  });
});
