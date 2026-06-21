const passwordInput = document.getElementById("password");

const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const specialEl = document.getElementById("special");

const bar = document.getElementById("strength-bar");
const text = document.getElementById("strength-text");

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  // reglas
  const hasLength = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasSpecial = /\W/.test(value);

  updateRule(lengthEl, hasLength);
  updateRule(upperEl, hasUpper);
  updateRule(lowerEl, hasLower);
  updateRule(specialEl, hasSpecial);

  // fuerza
  const score = [hasLength, hasUpper, hasLower, hasSpecial].filter(Boolean).length;

  updateStrength(score);
});

function updateRule(element, condition) {
  if (condition) {
    element.classList.add("valid");
  } else {
    element.classList.remove("valid");
  }
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

const submitBtn = document.getElementById("submit-btn");

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  const hasLength = value.length >= 8;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasSpecial = /\W/.test(value);

  updateRule(lengthEl, hasLength);
  updateRule(upperEl, hasUpper);
  updateRule(lowerEl, hasLower);
  updateRule(specialEl, hasSpecial);

  const score = [hasLength, hasUpper, hasLower, hasSpecial].filter(Boolean).length;

  updateStrength(score);

  const isValid = hasLength && hasUpper && hasLower && hasSpecial;

  submitBtn.disabled = !isValid;
});