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
const imagePicture = document.querySelector(".popup__img");
const imageCaption = document.querySelector(".popup__caption");
const closeButtons = document.querySelectorAll(".popup__cross");

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const imageElement = card.querySelector(".elements__card-photo");
  const likeButton = card.querySelector(".elements__icon");
  const titleElement = card.querySelector(".elements__title");
  const deleteButton = card.querySelector(".elements__delete-button");

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;

  likeButton.addEventListener("click", (evt) => {
    likeButton.classList.toggle("elements__icon_active");
  });

  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".elements__card").remove();
  });

  imageElement.addEventListener("click", function () {
    imagePicture.src = cardData.link;
    imageCaption.textContent = cardData.name;
    openPopup(imagePopup);

    imagePicture.alt = cardData.name;
  });

  return card;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

initialCards.forEach((card) => {
  const cards = createCard(card);
  elementsList.append(cards);
});

function addCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };
  evt.target.reset();
  const card = createCard(newCard);
  elementsList.prepend(card);
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

document.querySelector("#card_form").addEventListener("submit", addCard);
profileForm.addEventListener("submit", handleProfileFormSubmit);
profileCloseButton.addEventListener("click", () => closePopup(profilePopup));
cardCloseButton.addEventListener("click", () => closePopup(cardPopup));
imageCloseButton.addEventListener("click", () => closePopup(imagePopup));
editButton.addEventListener("click", openProfilePopup);
