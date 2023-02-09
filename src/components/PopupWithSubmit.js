import Popup from "../components/Popup.js";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = this._popup.querySelector(".popup__button_delete");
  }
  setEventListeners() {
    this._button.addEventListener("click", () => this._handleFormSubmit(this.cardId));
    super.setEventListeners();
  }

  setIdForDelete(id) {
    this.cardId = id;
  }
}
