const enroll_num = document.querySelector('#enroll_num');
const password = document.querySelector('#password');
const show = document.querySelector('#show');
const hide = document.querySelector('#hide');
const captcha_input = document.getElementById('captcha_input');
const login = document.getElementById('login');
const alrt_msg = document.getElementById('alert');
const enroll_msg = document.getElementById('enroll_alrt');
const pass_msg = document.getElementById('pass_alrt');
const capt_msg = document.getElementById('capt_alrt');

function validation() {
  if (enroll_num.value === '') {
    enroll_msg.innerText = 'Enroll No. field is mandatory';
  } else if (enroll_num.value.length < 16) {
    enroll_msg.innerText = 'Invalid enrollment number';
  } else {
    enroll_msg.innerText = '';
  }

  if (password.value === '') {
    pass_msg.innerText = 'Password field is mandatory';
  } else {
    pass_msg.innerText = '';
    captcha_validation();
  }

}
const canvas = document.getElementById('captcha-canvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('captcha-input');
const _login = document.getElementById('login');
const refresh = document.getElementById('captcha-refresh');

let captchaCode = '';

function generateCaptcha() {
  captchaCode = '';
  for (let i = 0; i < 6; i++) {
    const randomChar = getRandomChar();
    captchaCode += randomChar;
  }
  drawCaptcha();
}

function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function drawCaptcha() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '27px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeText(captchaCode, canvas.width / 2, canvas.height / 2);
}

function captcha_validation() {
  if (captcha_input.value !== captchaCode) {
    capt_msg.innerText = 'Invalid Captcha, try Again';
  } else {
    capt_msg.innerText = '';

    confirmation();
  }
}

function Login() {
  validation();
  generateCaptcha();

};

generateCaptcha();

refresh.addEventListener('click', () => {
  generateCaptcha();
});

show.addEventListener('click', () => {
  show.style.display = "none";
  hide.style.display = "flex";
  password.type = 'text'
});
hide.addEventListener('click', () => {
  hide.style.display = "none";
  show.style.display = "flex";
  password.type = 'password'
});

login.addEventListener('click', () => {
  Login()

})
// add javascript for farebase
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
function confirmation() {
  const dbref = ref(db);
  var pass = ''; 
  const enrollNumber = enroll_num.value;
    get(child(dbref, "mgkvp-website/" + enroll_num.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const enrollnum = data.Enrollno;
        pass = data.Password;
        if (password.value == pass) {
          alert("login successful")
          localStorage.setItem("enrollnum",enrollnum); 
          window.location="/marksheet.html"
        }
        else {
          alert("password is not matched")
        }
      } else {
        alert("No data found for this enrollment number");
      }
    })
    .catch((error) => {
      alert("Unsuccessful, error: " + error.message);
    });
}
