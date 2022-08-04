function handleFormInput(event) {
  const input = event.target;
  const form = event.currentTarget;
  showFieldError(input);
  setSubmitButtonState(form);
  setInputState(input);
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form) {
  const button = form.querySelector(".popup__button");
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove("popup__button_disabled");
  } else {
    button.disabled = true;
    button.classList.add("popup__button_disabled");
  }
}

function setInputState(input) {
  const isValid = input.checkValidity();
  if (isValid) {
    input.classList.remove("popup__item_type_invalid");
  } else {
    input.classList.add("popup__item_type_invalid");
  }
}

function enableValidation() {
  forms = document.querySelectorAll(".popup__form");
  forms.forEach((form) => {
    form.addEventListener("input", (event) => handleFormInput(event));
  });
}
enableValidation();
