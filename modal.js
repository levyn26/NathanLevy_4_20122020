function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const EltCloseBtn = document.querySelectorAll(".close-btn");
const SuccessMessage = document.querySelectorAll("#success-message");
const EltSuccessCloseBtn = document.querySelectorAll("#success-close-btn");

/** Form elements */
const form = document.getElementById('form')
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const city = document.querySelector("input[type=radio]");
const checkbox = document.getElementById("checkbox1");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event on CLICK
EltCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
EltSuccessCloseBtn.forEach(elt => elt.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
  SuccessMessage[0].style.display = "none";
}

form.addEventListener('submit', e => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  // trim to remove the whitespaces
  const firstValue = first.value.trim();
  const lastValue = last.value.trim();
  const emailValue = email.value.trim();
  const birthdateValue = birthdate.value.trim();
  const quantityValue = quantity.value.trim();
  const cityValue = city;
  const checkboxValue = checkbox;

  if (firstValue.length < 2) {
    setErrorFor(first, "Votre prénom doit comporter au minimum 2 caractères.");
    first.style.border = "2px solid red";
  } else {
    setSuccessFor(first);
    first.style.border = "none";
  }

  if (lastValue.length < 2) {
    setErrorFor(last, "Votre nom doit comporter au minimum 2 caractères.");
    last.style.border = "2px solid red";
  } else {
    setSuccessFor(last);
    last.style.border = "none";
  }

  if (emailValue === '') {
    setErrorFor(email, "Le champ e-mail ne peut pas être vide");
    email.style.border = "2px solid red";
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "E-mail non valide. Merci de l'écrire sous cette forme : hello@johndoe.com");
    email.style.border = "2px solid red";
  } else {
    setSuccessFor(email);
    email.style.border = "none";
  }

  if (birthdateValue === '') {
    setErrorFor(birthdate, "Le champ e-mail ne peut pas être vide");
    birthdate.style.border = "2px solid red";
  } else if (!isBirthday(birthdateValue)) {
  setErrorFor(birthdate, "Date de naissance non valide. Merci de l'écrire sous cette forme : jj/mm/aaaa");
    birthdate.style.border = "2px solid red";
  } else {
    setSuccessFor(birthdate);
    birthdate.style.border = "none";
  }

  if (quantityValue === '') {
    setErrorFor(quantity, "Erreur. Veuillez saisir un nombre ou un chiffre.");
    quantity.style.border = "2px solid red";
  } else {
    setSuccessFor(quantity);
    quantity.style.border = "none";
  }

  if (!isRadioChecked(cityValue)) {
    setErrorFor(city, "Erreur. Veuillez sélectionner au moins une ville");
  } else {
    setSuccessFor(city);
  }

  if (checkboxValue.checked === false) {
    setErrorFor(checkbox, "Vous devez accepter les conditions d'utilisation");
  } else {
    setSuccessFor(checkbox);
  }

  if (firstValue && lastValue && emailValue && birthdateValue && quantityValue && cityValue && checkboxValue !== ''){
    const formControl = first.parentElement;
    formControl.className = 'form-control success';
    SuccessMessage[0].style.display = "block";
    form.style.display = "none";
  } else {
    SuccessMessage[0].style.display = "none";
  }

}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isBirthday(birthdate) {
  return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(birthdate);
}

function isRadioChecked(city) {
return document.querySelectorAll("input[type=radio]:checked").length > 0;
}
