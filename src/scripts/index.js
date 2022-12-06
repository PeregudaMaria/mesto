import Card from "./card.js";
import FormValidator from "./validate.js";
import Section from "./section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

import '../pages/index.css';

import {
  editButton,
  addButton,
  profileNameSelector,
  profileBioSelector,
  profilePopupSelector,
  imagePopupSelector,
  cardPopupSelector,
  openedPopupSelector,
  elementsListSelector,
  profileForm,
  nameInput,
  bioInput,
  cardForm,
  titleInput,
  linkInput,
  cardTemplate,
  config,
  initialCards,
} from "./constants.js";

function handleCardClick(popup) {
  popup.classList.add(openedPopupSelector);
}
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, cardTemplate, handleCardClick);
      section.addItem(card.render());
    },
  },
  elementsListSelector
);

section.renderItems();

const cardValidator = new FormValidator(config, cardForm);
const profileValidator = new FormValidator(config, profileForm);
cardValidator.enableValidation();
profileValidator.enableValidation();

function addCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const card = new Card(cardData, cardTemplate, handleCardClick);
  section.addItem(card.render());
  evt.target.reset();
  cardValidator.disableSaveButton();
  cardValidator.clearValidationErrors();
}

const user = new UserInfo(profileNameSelector, profileBioSelector);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  user.setUserInfo(nameInput.value, bioInput.value);
}

const popupCard = new PopupWithForm(cardPopupSelector, addCard);
popupCard.setEventListeners();
addButton.addEventListener("click", () => {
  popupCard.open();
});

const popupProfile = new PopupWithForm(
  profilePopupSelector,
  handleProfileFormSubmit
);
popupProfile.setEventListeners();
editButton.addEventListener("click", () => {
  popupProfile.open();
});

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();