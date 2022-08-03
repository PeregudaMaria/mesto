const formTitleLink = {
  form: '.popup__form[name="form2"]',
  button: '.popup__button',
  buttonDisabled: 'popup__button_disabled',
  borderInvalid: 'popup__item_type_invalid'
};

const formNameJob ={
  form: '.popup__form[name="form"]',
  button: '.popup__button',
  buttonDisabled: 'popup__button_disabled',
  borderInvalid: 'popup__item_type_invalid'
};

function enableValidation(config) {
  const form = document.querySelector(config.form);
  form.addEventListener('input', (event) => handleFormInput(event, config));

}

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
  const button = form.querySelector(config.button);
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(config.buttonDisabled);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(config.buttonDisabled);
  }
}

function setInputState(input, config) {
  const isValid = input.checkValidity();
  if (isValid) {
    input.classList.remove(config.borderInvalid);
  } else {
    input.classList.add(config.borderInvalid);
  }
}


enableValidation(formTitleLink);

enableValidation(formNameJob);


function disableSaveButton (popup) {
  const button = popup.querySelector('.popup__button');
  button.setAttribute('disabled', true);
  button.classList.add('popup__button_type_disabled');
}
