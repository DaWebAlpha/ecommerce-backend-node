// validation.js

export const nameRegex = /^[a-zA-Z0-9_]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function validateUsername(input, messageEl) {
  const value = input.value.trim();
  let message = "";
  let isValid = false;

  if (!nameRegex.test(value)) {
    message = "Username can only contain letters, numbers, and underscore (_)";
  } else if (value.length < 5) {
    message = "Username should be 5 or more characters";
  } else {
    message = "✅ Valid username";
    isValid = true;
  }

  showValidation(messageEl, message, isValid);
  return isValid;
}

export function validateEmail(input, messageEl) {
  const value = input.value.trim();
  const isValid = emailRegex.test(value);
  const message = isValid ? "✅ Valid email" : "Enter a valid email";

  showValidation(messageEl, message, isValid);
  return isValid;
}

export function validatePassword(input, messageEl) {
  const value = input.value.trim();
  const isValid = passwordRegex.test(value);
  const message = isValid
    ? "✅ Strong password"
    : "❌ Must be 8+ chars with uppercase, lowercase, number & symbol";

  showValidation(messageEl, message, isValid);
  return isValid;
}

export function validateConfirmPassword(passwordInput, confirmInput, messageEl) {
  const isValid = passwordInput.value.trim() === confirmInput.value.trim();
  const message = isValid ? "✅ Passwords match" : "❌ Passwords do not match";

  showValidation(messageEl, message, isValid);
  return isValid;
}

function showValidation(el, message, valid) {
  el.textContent = message;
  el.style.color = valid ? "green" : "red";
}
