import { imagePopup, imagePicture, imageCaption } from "./constants.js";

export default class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    this._cardData = cardData;
    this._cardTemplate = cardSelector.cloneNode(true);
    this._likeButton = this._cardTemplate.querySelector(".elements__icon");
    this._deleteButton = this._cardTemplate.querySelector(
      ".elements__delete-button"
    );
    this._imageElement = this._cardTemplate.querySelector(
      ".elements__card-photo"
    );
    this._handleCardClick = handleCardClick;
    this._card = this._cardTemplate.querySelector(".elements__card")
  }

  _like() {
    this._likeButton.classList.toggle("elements__icon_active");
  }

  _delete() {
    this._card.remove()
  }

  _openPopup() {

    imagePicture.src = this._cardData.link;
    imagePicture.alt = this._cardData.name;
    imageCaption.textContent = this._cardData.name;
    this._handleCardClick(imagePopup);
  }

  _setupEventListeners() {
    this._likeButton.addEventListener("click", () => this._like());
    this._deleteButton.addEventListener("click", () => this._delete());
    this._imageElement.addEventListener("click", () => this._openPopup());
  }

  render() {
    const imageElement = this._cardTemplate.querySelector(
      ".elements__card-photo"
    );
    const titleElement = this._cardTemplate.querySelector(".elements__title");

    imageElement.src = this._cardData.link;
    imageElement.alt = this._cardData.name;
    titleElement.textContent = this._cardData.name;

    this._setupEventListeners();

    return this._cardTemplate;
  }
}
