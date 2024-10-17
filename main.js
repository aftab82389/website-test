const name = document.querySelector('#name');
const fat_name = document.querySelector('#fat_name');
const mot_name = document.querySelector('#mot_name');
const roll_no = document.querySelector('#rollno');
const enroll_no = document.querySelector('#enrollno');
const college = document.querySelector('#college');
const semester = document.querySelector('#semester');
const subjects = document.querySelectorAll('.subjects');
const password = document.querySelector('#password');
const cmf_password = document.querySelector('#cmf_password');
const btn = document.querySelector('#submit')
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyAeklfKOLl_3zIZ1sA81aqtWM3xikIbKas",
  authDomain: "mgkvp-website.firebaseapp.com",
  projectId: "mgkvp-website",
  storageBucket: "mgkvp-website.appspot.com",
  messagingSenderId: "306111041649",
  appId: "1:306111041649:web:1c51ba0f01dfa5d1000bd0"
};
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, child, update, remove }
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
const db = getDatabase();
let subjects_info = [];

function Subjects() {
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].checked) {
      subjects_info.push(subjects[i].value);
      
    }
    
  }
}
Subjects()
function insertData() {
  set(ref(db, "mgkvp-website/" + enroll_no.value), {
      Name: name.value,
      Fathername: fat_name.value,
      MotherName: mot_name.value,
      Rollno: roll_no.value,
      Enrollno: enroll_no.value,
      College: college.value,
      Semester: semester.value,
      Subjects: subjects_info,
      Password: password.value
    })
    .then(() => {
      console.log("Data successfully store");
      alert("Form Submission Successful"); 
      window.location="/login.html";
    })
    .catch((error) => {
      alert("Unsuccessful,error " + error)
    })
}
btn.addEventListener('click', () => {
  Subjects();
  
  if ((name.value !== '') &&
    (fat_name.value !== '') &&
    (mot_name.value !== '') &&
    (college.value !== '') &&
    (rollno.value !== '') &&
    (enroll_no.value !== '') &&
    (semester.value !== '') &&
    (subjects_info.length > 0) &&
    (password.value !== '') &&
    (cmf_password.value !== '')) {

    if (password.value !== cmf_password.value) {
      alert("Passwords do not match");
    } else {
      insertData();
      
      
    }
  } else {
    alert("Please fill all fields");
  }
})