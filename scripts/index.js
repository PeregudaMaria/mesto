const profilePopup = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const imageCloseButton = document.querySelector("#close_button_image");
const cardCloseButton = document.querySelector("#close_button_card");
const profileCloseButton = document.querySelector("#close_button_profile");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__status");
const profileForm = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__item_type_name");
const jobInput = document.querySelector(".popup__item_type_job");
const cardPopup = document.querySelector(".popup-card");
const cardForm = cardPopup.querySelector(".popup__container-card");
const titleInput = cardForm.querySelector(".popup__item_type_title");
const linkInput = cardForm.querySelector(".popup__item_type_link");
const elementsList = document.querySelector(".elements__list");
const cardTemplate = document.querySelector(".element-template").content;
const imagePopup = document.querySelector(".popup-image");
const closeButtons = document.querySelectorAll(".popup__cross");

const config = {
  formSelector: ".popup__form",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_invalid",
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

initialCards.forEach((card) => {
  const NewCard = new Card(card, cardTemplate, openPopup);
  elementsList.append(NewCard.render());
});

function addCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };
  evt.target.reset();
  const card = new Card(newCard, cardTemplate, openPopup);
  elementsList.prepend(card.render());
  closePopup(cardPopup);
  disableSaveButton(cardPopup);
  spansErrorsReset(cardPopup);
  inputsInvalidReset(cardPopup);
}

function closeOpenedPopup() {
  const openedPopup = document.querySelector(".popup_opened");
  closePopup(openedPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeOpenedPopup();
}

function spansErrorsReset(popup) {
  const spans = Array.from(popup.querySelectorAll(".popup__input-error"));
  spans.forEach((span) => (span.textContent = ""));
}

function inputsInvalidReset(popup) {
  const inputs = Array.from(popup.querySelectorAll(".popup__item"));
  inputs.forEach((input) => input.classList.remove("popup__item_type_invalid"));
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closeOpenedPopup();
  }
}

function closePopupByOverlayClick(event, popup) {
  if (event.target === popup) {
    closeOpenedPopup(popup);
  }
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closeOpenedPopup(popup);
  });
  popup.addEventListener("click", (event) => {
    closePopupByOverlayClick(event, popup);
  });
});

function disableSaveButton(popup) {
  const button = popup.querySelector(".popup__button");
  button.disabled = true;
  button.classList.add("popup__button_disabled");
}

const buttons = document.getElementsByClassName("popup__cross");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", closeOpenedPopup);
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);

  spansErrorsReset(profilePopup);
  inputsInvalidReset(profilePopup);
}

addButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

const forms = document.querySelectorAll(config.formSelector);

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});

document.querySelector("#card_form").addEventListener("submit", addCard);
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileCloseButton.addEventListener("click", () => closePopup(profilePopup));
cardCloseButton.addEventListener("click", () => closePopup(cardPopup));
imageCloseButton.addEventListener("click", () => closePopup(imagePopup));
editButton.addEventListener("click", openProfilePopup);

import Card from "./card.js";
import FormValidator from "./validate.js";
