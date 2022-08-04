const config = {
  formSelector: ".popup__form",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_invalid",
};

function handleFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;
  showFieldError(input);
  setSubmitButtonState(form, config);
  setInputState(input, config);
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  }
}

function setInputState(input, config) {
  const isValid = input.checkValidity();
  if (isValid) {
    input.classList.remove(config.inputErrorClass);
  } else {
    input.classList.add(config.inputErrorClass);
  }
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.addEventListener("input", (event) => handleFormInput(event, config));
  });
}
enableValidation(config);
