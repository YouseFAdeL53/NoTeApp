// Start Dark Mode

let theSun = document.querySelector(".sun i");
let theMoon = document.querySelector(".moon i");
let icon = document.querySelector(".icons");

let localMode = localStorage.getItem("darkMode");

if (localMode != null) {
  if (localMode == "true") {
    icon.classList.add("dark");
    document.body.classList.add("darkMode");
  } else {
    icon.classList.remove("dark");
    document.body.classList.remove("darkMode");
  }
}

theSun.addEventListener("click", (e) => {
  if (e.target.parentElement.dataset.mode == "light") {
    icon.classList.add("dark");
    document.body.classList.add("darkMode");
    localStorage.setItem("darkMode", "true");
  }
});

theMoon.addEventListener("click", (e) => {
  if (e.target.parentElement.dataset.mode == "dark") {
    icon.classList.remove("dark");
    document.body.classList.remove("darkMode");
    localStorage.setItem("darkMode", "false");
  }
});

let addSection = document.querySelector(".add");
let lightBox = document.querySelector(".lightbox");
let theHeading = document.querySelector(".head h2");
let myBtn = document.querySelector(".send-btn");
let closeBtn = document.querySelector(".close");
let myInput = document.querySelector(".one input");
let textArea = document.querySelector(".two textarea");

// create idEdit === isEdit
let idEdit,
  isEdit = false;

// Months oF the Year

let Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Array

let arrayOfNote = [];

// Check LocalStorage

let localNote = localStorage.getItem("pageNote");

if (localNote != null) {
  arrayOfNote = JSON.parse(localNote);
}

addSection.addEventListener("click", () => {
  lightBox.classList.add("show");
  theHeading.innerHTML = "Add Your Note";
  myBtn.innerHTML = "Create Note";
  myInput.value = "";
  textArea.value = "";
});

// Close LightBox

closeBtn.addEventListener("click", () => {
  isEdit = false;
  lightBox.classList.remove("show");
});

// CreateNote

const createNote = () => {
  document.querySelectorAll(".content .box").forEach((box) => box.remove());
  for (let i = 0; i < arrayOfNote.length; i++) {
    let markUp = `
            <div class="box card-style">
          <div class="text">
            <h2>${arrayOfNote[i].theTitle}</h2>
            <p>${arrayOfNote[i].desc}</p>
          </div>
          <div class="details">
            <span class="date">${arrayOfNote[i].date}</span>
            <div class="icon">
              <i class="fa-solid fa-ellipsis"></i>
              <ul class="list">
                <li onclick="editNote(${i}, '${arrayOfNote[i].theTitle}', '${arrayOfNote[i].desc}')"><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                <li onclick="deleteNote(${i})"><i class="fa-solid fa-trash"></i>Delete</li>
              </ul>
            </div>
          </div>
        </div>
    `;
    addSection.insertAdjacentHTML("afterend", markUp);
  }
};

createNote();

// Delte Note
const deleteNote = (theId) => {
  arrayOfNote.splice(theId, 1);
  // Update localStorage
  localStorage.setItem("pageNote", JSON.stringify(arrayOfNote));
  createNote();
};

myBtn.addEventListener("click", () => {
  let title = myInput.value.trim();
  let description = textArea.value.trim();
  if (title != "" && description != "") {
    // Create Date
    // get Month
    let date = new Date().getMonth();
    let month = Months[date];
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    // Create Object
    let theObj = {
      theTitle: title,
      desc: description,
      date: `${month}, ${day}, ${year}`,
    };
    // Check
    if (isEdit) {
      arrayOfNote[idEdit] = theObj;
    } else {
      arrayOfNote.push(theObj);
    }
    // Local Storage
    localStorage.setItem("pageNote", JSON.stringify(arrayOfNote));
    createNote();
    closeBtn.click();
  }
});

const editNote = (indx, title, descr) => {
  idEdit = indx;
  isEdit = true;
  addSection.click();
  myInput.value = title;
  textArea.value = descr;
  myBtn.innerHTML = "Update Note";
  theHeading.innerHTML = "Update Your Note";
};
