export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }
  _handleFormInput(event) {
    const input = event.target;
    this._showFieldError(input);
    this._setSubmitButtonState();
    this._setInputState(input);
  }

  enableValidation() {
    this._form.addEventListener("input", (event) =>
      this._handleFormInput(event)
    );
  }

  _showFieldError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
  }

  _setSubmitButtonState() {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    const isValid = this._form.checkValidity();
    if (isValid) {
      button.removeAttribute("disabled");
      button.classList.remove(this._config.inactiveButtonClass);
    } else {
      button.disabled = true;
      button.classList.add(this._config.inactiveButtonClass);
    }
  }

  _setInputState(input) {
    const isValid = input.checkValidity();
    if (isValid) {
      input.classList.remove(this._config.inputErrorClass);
    } else {
      input.classList.add(this._config.inputErrorClass);
    }
  }

  disableSaveButton() {
    const button = this._form.querySelector(".popup__button");
    button.disabled = true;
    button.classList.add("popup__button_disabled");
  }

  _resetSpansErrors(){
    const spans = Array.from(this._form.querySelectorAll(".popup__input-error"));
    spans.forEach((span) => (span.textContent = ""));
  }

  _resetInputsInvalid() {
    const inputs = Array.from(this._form.querySelectorAll(".popup__item"));
    inputs.forEach((input) =>
      input.classList.remove("popup__item_type_invalid")
    );
  }

  clearValidationErrors(){
    this._resetSpansErrors()
    this._resetInputsInvalid()
  }
}
