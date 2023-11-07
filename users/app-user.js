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
const allYourCvContainer = document.querySelector(".all-your-CV");

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

const generateDOM = (cv) => {
  // container
  const newContainerForCv = document.createElement("div");

  // name
  const fullNameEl = document.createElement("p");
  fullNameEl.innerHTML = `<strong>Name:</strong> ${cv.fullName}`;
  newContainerForCv.append(fullNameEl);

  //phone
  const phoneEl = document.createElement("p");
  phoneEl.innerHTML = `<strong>Phone:</strong>  +250 123 456 789`;
  newContainerForCv.append(phoneEl);

  //email
  const emailEl = document.createElement("p");
  emailEl.innerHTML = `<strong>Email:</strong> ${cv.email}`;
  newContainerForCv.append(emailEl);

  // location
  const locationEl = document.createElement("p");
  locationEl.innerHTML = `<strong>location:</strong> ${cv.location}`;
  newContainerForCv.append(locationEl);

  //Personal Statement
  const personalStatementEl = document.createElement("p");
  personalStatementEl.innerHTML = `<strong>Personal statement: </strong> ${cv.personalStatement}`;
  newContainerForCv.append(personalStatementEl);

  //Education and Qualifications
  // education title
  const educationTitle = document.createElement("p");
  educationTitle.innerHTML = `<strong>Education and Qualifications</strong>`;
  newContainerForCv.append(educationTitle);
  // Education
  const listEl = document.createElement("ul");
  const itemEl = document.createElement("li");
  itemEl.textContent = cv.educationAndQualification;
  listEl.append(itemEl);
  newContainerForCv.append(listEl);

  //Work Experience
  // work title
  const workTitle = document.createElement("p");
  workTitle.innerHTML = `<strong>Work Experience</strong>`;
  newContainerForCv.append(workTitle);
  // work
  const listWorkEl = document.createElement("ul");
  const itemWorkEl = document.createElement("li");
  itemWorkEl.textContent = cv.workExperience;

  listWorkEl.append(itemWorkEl);
  newContainerForCv.append(listWorkEl);

  //skills
  // skills title
  const skillsTitle = document.createElement("p");
  skillsTitle.innerHTML = `<strong>Skills</strong>`;
  newContainerForCv.append(skillsTitle);
  // skills
  const listskillsEl = document.createElement("ul");
  const itemskillsEl = document.createElement("li");
  itemskillsEl.textContent = cv.skills;

  listskillsEl.append(itemskillsEl);
  newContainerForCv.append(listskillsEl);

  //language
  // language title
  const language = document.createElement("p");
  language.innerHTML = `<strong>Language</strong>`;
  newContainerForCv.append(language);
  // language
  const listLanguageEl = document.createElement("ul");
  const itemLanguageEl = document.createElement("li");
  itemLanguageEl.textContent = cv.languages;

  listLanguageEl.append(itemLanguageEl);
  newContainerForCv.append(listLanguageEl);

  // awards and publication
  // certifications title
  const certificationsEl = document.createElement("p");
  certificationsEl.innerHTML = `<strong>Certifications</strong>`;
  newContainerForCv.append(certificationsEl);

  // certifications
  const listcertificationsEl = document.createElement("ul");
  const itemcertificationsEl = document.createElement("li");
  itemcertificationsEl.textContent = cv.certifications;

  listcertificationsEl.append(itemcertificationsEl);
  newContainerForCv.append(listcertificationsEl);

  // Hobbies and Interests title
  const hobbiesAndInterestsEl = document.createElement("p");
  hobbiesAndInterestsEl.innerHTML = `<strong>Hobbies and interests</strong>`;
  newContainerForCv.append(hobbiesAndInterestsEl);

  // Hobbies and Interests
  const listHobbiesAndInterestsEl = document.createElement("ul");
  const itemHobbiesAndInterestsEl = document.createElement("li");
  itemHobbiesAndInterestsEl.textContent = cv.hobbiesAndInterests;

  listHobbiesAndInterestsEl.append(itemHobbiesAndInterestsEl);
  newContainerForCv.append(listHobbiesAndInterestsEl);
  // add class according to the cv id
  newContainerForCv.classList.add(`cv-${cv.id}`);

  ////////////////////////////////
  // buttons
  ////////////////////////////////

  // download btn
  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Download as PDF";
  newContainerForCv.append(downloadBtn);
  downloadBtn.addEventListener("click", () => {
    generatePDF(cv);
  });

  // delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  newContainerForCv.append(deleteBtn);
  deleteBtn.addEventListener("click", () => deleteThis(cv.id));

  ////////////////////////////////
  // append on parent container
  ////////////////////////////////
  allYourCvContainer.append(newContainerForCv);
};

const createCV = async (data) => {
  const config = {
    fullName: data.target.elements.fullName.value,
    email: data.target.elements.email.value,
    location: data.target.elements.location.value,
    educationAndQualification: data.target.elements.education.value,
    skills: data.target.elements.skills.value,
    languages: data.target.elements.languages.value,
    certifications: data.target.elements.certifications.value,
    workExperience: data.target.elements.workExperience.value,
    hobbiesAndInterests: data.target.elements.hobbies.value,
    personalStatement: data.target.elements.personalStatement.value,
  };

  try {
    const res = await axios.post(
      "http://localhost:3333/curriculum-vitaes",
      config,
      {
        headers: {
          Authorization: `Bearer ${loginAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
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
    errorHandling.textContent = allError;
  }
};

createCVBtn.addEventListener("click", () => {
  container.style.display = "block";
  newContainer.style.display = "none";
});

//////////////////////////////////////////////////////////////////////////
// call all cv from api
//////////////////////////////////////////////////////////////////////////
viewAllCVBtn.addEventListener("click", async () => {
  // Container
  container.style.display = "none";
  newContainer.style.display = "block";

  const res = await axios.get("http://localhost:3333/curriculum-vitaes", {
    headers: {
      Authorization: `Bearer ${loginAccessToken}`,
      "Content-Type": "application/json",
    },
  });
  // give back all data in arrayr
  const allCV = res.data;
  // if user don't have data
  if (allCV.length === 0) {
    document.querySelector(".heading").textContent = "You don't have any CV";
  }

  // clean duplicate data
  allYourCvContainer.innerHTML = "";
  // loop array
  allCV.forEach((cv) => {
    generateDOM(cv);
  });
});

const generatePDF = (cv) => {
  const containerToChangeInPdf = document.querySelector(`.cv-${cv.id}`);
  // Create a new jsPDF object
  const pdf = new jsPDF({
    unit: "in",
    format: "a4",
    orientation: "portrait",
  });

  let textLines = pdf
    .setFont("times")
    .setFontSize(12)
    .splitTextToSize(containerToChangeInPdf.innerText, 7.25);
  let verticalOffset = 0.5;
  pdf.text(0.5, verticalOffset + 12 / 72, textLines);
  verticalOffset += ((textLines.length + 0.5) * 12) / 72;
  // convert html element to pdf
  pdf.fromHTML(containerToChangeInPdf, 7, 7);
  // save it
  pdf.save(`${cv.fullName} CV.pdf`);
};

const deleteThis = async (id) => {
  // console.log(id);

  // verify
  const choose = prompt(
    `⚠ Do you want to delete  this CV??? Type "1" to delete it. ⚠`
  );
  if (parseInt(choose) === 1) {
    try {
      const res = await axios.delete(
        `http://localhost:3333/curriculum-vitaes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${loginAccessToken}`,
            "content-type": "application/json",
          },
        }
      );
      location.assign("../users/deleteOk.html");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Enter incollect number ");
  }
};
