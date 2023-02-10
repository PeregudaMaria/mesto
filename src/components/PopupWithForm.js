import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__item");
    this._submitBtn = this._form.querySelector(".popup__button");
    this._submitBtnText = this._submitBtn.textContent;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  fillInputValues(inputValues) {
    this._inputList.forEach((input) => {
      const name = input.name;
      const newValue = inputValues[name];
      input.value = newValue;
    });
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
  
}