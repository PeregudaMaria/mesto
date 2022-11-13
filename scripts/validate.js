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
}
