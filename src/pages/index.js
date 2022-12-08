import Card from "../components/Card.js";
import FormValidator from "../components/Validate.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

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
} from "../utils/constants.js";

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleCardClick);
  return card.render();
}

function handleCardClick(cardData) {
  popupImage.open(cardData.name, cardData.link);
}

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      section.addItem(createCard(cardData));
    },
  },
  elementsListSelector
);

section.renderItems();

const cardValidator = new FormValidator(config, cardForm);
const profileValidator = new FormValidator(config, profileForm);
cardValidator.enableValidation();
profileValidator.enableValidation();

function addCard(evt, inputValues) {
  evt.preventDefault();
  const cardData = {
    name: inputValues.imgName,
    link: inputValues.imgSrc,
  };
  section.addItem(createCard(cardData));
  evt.target.reset();
  cardValidator.disableSaveButton();
  cardValidator.clearValidationErrors();
}

const user = new UserInfo(profileNameSelector, profileBioSelector);

function handleProfileFormSubmit(evt, inputValues) {
  evt.preventDefault();
  user.setUserInfo(inputValues.profileName, inputValues.profileBio);
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
  popupProfile.fillInputValues({
    profileName: document.querySelector(profileNameSelector).textContent,
    profileBio: document.querySelector(profileBioSelector).textContent,
  });
  popupProfile.open();
});

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();
