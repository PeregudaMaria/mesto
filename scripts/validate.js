export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._button =  form.querySelector(config.submitButtonSelector);
    this._errorSpans = Array.from(this._form.querySelectorAll(config.inputError));
    this._inputs = Array.from(this._form.querySelectorAll(config.inputPopup));
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
    console.log(this._form)
    const isValid = this._form.checkValidity();
    console.log(isValid)
    if (isValid) {
      this._button.removeAttribute("disabled");
      this._button.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._button.disabled = true;
      this._button.classList.add(this._config.inactiveButtonClass);
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
    this._button.disabled = true;
    this._button.classList.add(this._config.inactiveButtonClass);
  }

  _resetSpansErrors(){
    this._errorSpans.forEach((span) => (span.textContent = ""));
  }

  _resetInputsInvalid() {
    this._inputs.forEach((input) =>
      input.classList.remove(this._config.inputErrorClass)
    );
  }

  clearValidationErrors(){
    this._resetSpansErrors()
    this._resetInputsInvalid()
  }
}
