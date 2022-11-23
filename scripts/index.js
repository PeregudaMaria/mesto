import Card from "./card.js";
import FormValidator from "./validate.js";
import {
  profilePopup,
  editButton,
  addButton,
  imageCloseButton,
  cardCloseButton,
  profileCloseButton,
  profileName,
  profileJob,
  profileForm,
  nameInput,
  jobInput,
  cardPopup,
  cardForm,
  titleInput,
  linkInput,
  elementsList,
  cardTemplate,
  imagePopup,
  closeButtons,
  config,
  initialCards
} from "./constants.js";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

initialCards.forEach((cardData) => {
  createCardAndAddToElemntsList(cardData, cardTemplate);
});


const cardValidator = new FormValidator(config, cardForm) 
const profileValidator = new FormValidator(config, profileForm)
cardValidator.enableValidation()
profileValidator.enableValidation()

function addCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };
  createCardAndAddToElemntsList(cardData, cardTemplate);
  closePopup(cardPopup);
  evt.target.reset();
  cardValidator.disableSaveButton();
  cardValidator.clearValidationErrors();
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

const buttons = document.getElementsByClassName("popup__cross");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", closeOpenedPopup);
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileValidator.clearValidationErrors(profilePopup);
  openPopup(profilePopup);
}

addButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

document.querySelector("#card_form").addEventListener("submit", addCard);
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileCloseButton.addEventListener("click", () => closePopup(profilePopup));
cardCloseButton.addEventListener("click", () => closePopup(cardPopup));
imageCloseButton.addEventListener("click", () => closePopup(imagePopup));
editButton.addEventListener("click", openProfilePopup);

function createCardAndAddToElemntsList(cardData, cardTemplate) {
  const card = new Card(cardData, cardTemplate, openPopup);
  elementsList.prepend(card.render());
}
