// main.js
import { setupFormValidation, handleFormSubmit } from './formHandlers.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  const formElements = {
    username: document.getElementById("username"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
    validateForms: document.querySelector(".validateForms"),
    nameMsg: document.querySelector(".validateNameMessage"),
    emailMsg: document.querySelector(".validateEmailMessage"),
    passMsg: document.querySelector(".validatePassword"),
    confirmMsg: document.querySelector(".validateConfirmPassword")
  };

  setupFormValidation(formElements);
  form.addEventListener("submit", (e) => handleFormSubmit(e, formElements));
});
