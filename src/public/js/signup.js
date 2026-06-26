const passwordInput = document.getElementById("password");
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const specialEl = document.getElementById("special");
const bar = document.getElementById("strength-bar");
const text = document.getElementById("strength-text");
const submitBtn = document.getElementById("submit-btn");

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  const hasLength = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasSpecial = /\W/.test(value);
  const score = [hasLength, hasUpper, hasLower, hasSpecial].filter(Boolean).length;

  updateRule(lengthEl, hasLength);
  updateRule(upperEl, hasUpper);
  updateRule(lowerEl, hasLower);
  updateRule(specialEl, hasSpecial);
  updateStrength(score);

  submitBtn.disabled = !(hasLength && hasUpper && hasLower && hasSpecial);
});

function updateRule(element, condition) {
  element.classList.toggle("valid", condition);
}

function updateStrength(score) {
  const percent = (score / 4) * 100;

  bar.style.width = percent + "%";

  if (score <= 1) {
    bar.style.background = "red";
    text.textContent = "Muy débil";
  } else if (score === 2) {
    bar.style.background = "orange";
    text.textContent = "Débil";
  } else if (score === 3) {
    bar.style.background = "yellowgreen";
    text.textContent = "Buena";
  } else {
    bar.style.background = "green";
    text.textContent = "Fuerte";
  }
}
