export const profilePopup = document.querySelector(".popup-profile");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const imageCloseButton = document.querySelector("#close_button_image");
export const cardCloseButton = document.querySelector("#close_button_card");
export const profileCloseButton = document.querySelector(
  "#close_button_profile"
);

export const profilePopupSelector = ".popup-profile";
export const imagePopupSelector = ".popup-image";
export const cardPopupSelector = ".popup-card";
export const profileNameSelector = ".profile__name";
export const profileBioSelector = ".profile__bio";
export const openedPopupSelector = "popup_opened";
export const elementsListSelector = ".elements__list";



export const profileName = document.querySelector(".profile__name");
export const profileBio = document.querySelector(".profile__bio");
export const profileForm = document.querySelector(
  ".popup__container .popup__form"
);
export const nameInput = document.querySelector(".popup__item_type_name");
export const bioInput = document.querySelector(".popup__item_type_bio");
export const cardPopup = document.querySelector(".popup-card");
export const cardForm = cardPopup.querySelector(
  ".popup__container-card .popup__form"
);
export const titleInput = cardForm.querySelector(".popup__item_type_title");
export const linkInput = cardForm.querySelector(".popup__item_type_link");
export const elementsList = document.querySelector(".elements__list");
export const cardTemplate = document.querySelector(".element-template").content;
export const imagePopup = document.querySelector(".popup-image");
export const closeButtons = document.querySelectorAll(".popup__cross");
export const imagePicture = document.querySelector(".popup__img");
export const imageCaption = document.querySelector(".popup__caption");

export const config = {
  formSelector: ".popup__form",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__item_type_invalid",
  inputPopup: ".popup__item",
  inputError: "popup__input-error",
};

export const initialCards = [
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