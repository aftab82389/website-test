const total = document.querySelectorAll('.total');
const internal = document.querySelectorAll('.internal');
const obt_grade_point = document.querySelectorAll('.obt_grade_point');
const tot_grade_point = document.querySelectorAll('.tot_grade_point');
const default_point = document.querySelectorAll('.default_point');
const grade = document.querySelectorAll('.grade');
const tot_point = document.querySelector('.tot_point');
// add javascript for result card
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
import { getDatabase, get, ref, set, child, update, remove }
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
const db = getDatabase();

function comfirmation() {
  const dbref = ref(db);
  const enrollNumber = localStorage.getItem("enrollnum");
  const name = document.querySelector('#name');
  const fat_name = document.querySelector('#fat_name');
  const mot_name = document.querySelector('#mot_name');
  const enrollno = document.querySelector('#enrollno');
  const rollno = document.querySelector('#rollno');
  const college = document.querySelector('#college');
  const subject = document.querySelectorAll('.subject'); 
  get(child(dbref, "mgkvp-website/" + enrollNumber))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        enrollno.innerHTML = data.Enrollno;
        name.innerHTML = data.Name;
        fat_name.innerHTML = data.Fathername;
        mot_name.innerHTML = data.MotherName;
        rollno.innerHTML = data.Rollno;
        college.innerHTML = data.College;
        for(let i=0;i<data.Subjects.length;i++){
          if(i==0){
          subject[i].innerHTML="MAJOR I : "+data.Subjects[i];
          }
          else if (i==1){
            subject[i].innerHTML="MAJOR II : "+data.Subjects[i];
          }
          else{
            subject[i].innerHTML="MAJOR III : "+data.Subjects[i] 
          }
        }
        
        
      } else {
        console.log("No data found for this enrollment number");
      }
    })
    .catch((error) => {
      alert("Unsuccessful, error: " + error.message);
    });
}
comfirmation()

function theory_pracno() {
  return Math.floor(Math.random() * (65 - 53 + 1)) + 53;
}

function internalno() {
  return Math.floor(Math.random() * (19 - 16 + 1)) + 16;
}
var theory = document.querySelectorAll('.theory');
for (let i = 0; i < theory.length; i++) {
  theory[i].innerHTML = theory_pracno() + "/75";
  internal[i].innerHTML = internalno() + "/25";
  total[i].innerHTML = (eval(theory[i].innerHTML) * 75 + eval(internal[i].innerHTML) * 25) + "/100"
  if (eval(total[i].innerHTML) * 100 > 90) {
    obt_grade_point[i].innerHTML = 10;
  }
  else if (eval(total[i].innerHTML) * 100 > 80) {
    obt_grade_point[i].innerHTML = 9;
  }
  else if (eval(total[i].innerHTML) * 100 > 70) {
    obt_grade_point[i].innerHTML = 8;
  }
  else if (eval(total[i].innerHTML) * 100 > 60) {
    obt_grade_point[i].innerHTML = 7;
  }
  else if (eval(total[i].innerHTML) * 100 > 50) {
    obt_grade_point[i].innerHTML = 6;
  }
  else if (eval(total[i].innerHTML) * 100 > 40) {
    obt_grade_point[i].innerHTML = 5;
  }
  else if (eval(total[i].innerHTML) * 100 > 32) {
    obt_grade_point[i].innerHTML = 4;
  }
  else {
    obt_grade_point[i].innerHTML = 0;
  }

  tot_grade_point[i].innerHTML = (+obt_grade_point[i].innerHTML) * (+default_point[i].innerHTML);
  tot_point.innerHTML = Number(tot_point.innerHTML) + Number(tot_grade_point[i].innerHTML)
  if (obt_grade_point[i].innerHTML == 9) {
    grade[i].innerHTML = 'A+'
  }
  else if (obt_grade_point[i].innerHTML == 8) {
    grade[i].innerHTML = 'A'
  }
  else if (obt_grade_point[i].innerHTML == 7) {
    grade[i].innerHTML = 'B+'
  }
  else if (obt_grade_point[i].innerHTML == 6) {
    grade[i].innerHTML = 'B'
  }
  else if (obt_grade_point[i].innerHTML == 5) {
    grade[i].innerHTML = 'C'
  }
  else if (obt_grade_point[i].innerHTML == 4) {
    grade[i].innerHTML = 'P'
  }
  else if (obt_grade_point[i].innerHTML < 4) {
    grade[i].innerHTML = 'F'
  }
}
let sgpa_ = (tot_point.innerHTML / 21).toFixed(3);
let cgpa_ = (sgpa_ - 0.9).toFixed(3);
let date_ = `${padZero(new Date().getDate())}/${padZero(new Date().getMonth() + 1)}/${new Date().getFullYear()}`;

function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}

const cgpa = document.querySelector('.cgpa');
const sgpa = document.querySelector('.sgpa');
const _date = document.querySelector('.date');
cgpa.innerHTML = "CGPS: " + cgpa_;
sgpa.innerHTML = "SGPA: " + sgpa_;
_date.innerHTML = "DATE: " + date_;