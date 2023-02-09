import Popup from "../components/Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector(".popup__button_delete");
  }

  setupCard(card) {
    this._card = card;
  }

  setupSubmitListener(handlerSubmit) {
    this._button.addEventListener("click", () => handlerSubmit(this._card));
  }
}
