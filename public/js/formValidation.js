import {
  validateUsername,
  validateEmail,
  validateConfirmPassword
} from './validation.js';

const form = document.querySelector("form");
//const validateForms = document.querySelector(".validateForms");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const validateNameMessage = document.querySelector(".validateNameMessage");
const validateEmailMessage = document.querySelector(".validateEmailMessage");
const validateConfirmPasswordMessage = document.querySelector(".validateConfirmPassword");

// ✅ Password Strength Elements
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");
const symbol = document.getElementById("symbol");  // ✅ New
const passwordMessageBox = document.getElementById("message");

const togglePassword = document.getElementById('togglePassword');
const togglePassword1 = document.getElementById('togglePassword1')

password.onfocus = () => {
  passwordMessageBox.style.display = "block";
  togglePassword.style.top = '57px';
};

password.onblur = () => {
  passwordMessageBox.style.display = "none";
};

password.onkeyup = () => {
  const val = password.value;

  toggleValidation(/(?=.*[a-z])/.test(val), letter);     // lowercase
  toggleValidation(/(?=.*[A-Z])/.test(val), capital);    // uppercase
  toggleValidation(/(?=.*\d)/.test(val), number);        // number
  toggleValidation(val.length >= 8, length);             // length
  toggleValidation(/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(val), symbol); // ✅ symbol
};

function toggleValidation(condition, element) {
  element.classList.remove("valid", "invalid");
  element.classList.add(condition ? "valid" : "invalid");
}

// 👂 Input Listeners
username.addEventListener("input", () => {
  validateUsername(username, validateNameMessage);
  /* validateForms.textContent = ""; */
});

email.addEventListener("input", () => {
  validateEmail(email, validateEmailMessage);
  /* validateForms.textContent = ""; */
});

confirmPassword.addEventListener("input", () => {
  validateConfirmPassword(password, confirmPassword, validateConfirmPasswordMessage);
  /* validateForms.textContent = ""; */
  togglePassword1.style.top="57px";
});

// 📨 Form Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isNameValid = validateUsername(username, validateNameMessage);
  const isEmailValid = validateEmail(email, validateEmailMessage);
  const isConfirmValid = validateConfirmPassword(password, confirmPassword, validateConfirmPasswordMessage);

  const isPasswordStrong =
    letter.classList.contains("valid") &&
    capital.classList.contains("valid") &&
    number.classList.contains("valid") &&
    length.classList.contains("valid") &&
    symbol.classList.contains("valid"); // ✅ New check

  /* if (!isNameValid || !isEmailValid || !isConfirmValid || !isPasswordStrong) {
    validateForms.textContent = '❌ Fix all errors before submitting';
    validateForms.style.color = "red";
    return;
  } */

  form.submit(); // ✅ Submit
});
