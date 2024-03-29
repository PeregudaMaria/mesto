export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__cross");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closePopupByOverlayClick(event) {
    if (event.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (event) =>
      this._closePopupByOverlayClick(event)
    );
  }
}
