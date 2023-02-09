import Card from "../components/Card.js";
import FormValidator from "../components/Validate.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";

import "../pages/index.css";

import {
  avatarButton,
  avatarSubmit,
  profileSubmit,
  cardSubmit,
  loadingString,
  editButton,
  addButton,
  profileNameSelector,
  profileBioSelector,
  avatarSelector,
  profilePopupSelector,
  imagePopupSelector,
  cardPopupSelector,
  avatarPopupSelector,
  avatarPopup,
  elementsListSelector,
  profileForm,
  cardForm,
  cardTemplate,
  config,
  initialCards,
  cardDeleteSelector,
} from "../utils/constants.js";

const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "b62f355c-3b4c-496c-8d2e-ef61ddac11ed",
    "Content-Type": "application/json",
  }
};

const api = new Api(configApi);




api.getUserInfo().then((data) => {
  user.setUserInfo(data.name, data.about, data.avatar, data._id);
}).catch((err) => {
  console.log(err); 
});

const user = new UserInfo(
  profileNameSelector,
  profileBioSelector,
  avatarSelector
);

function handleDelete(id) {
  api.deleteCard(id).then(() => location.reload())
}  

const popupForDelete = new PopupWithSubmit(cardDeleteSelector, handleDelete);
popupForDelete.setEventListeners()

function createCard(cardData) {

  const card = new Card(
    cardData,
    cardTemplate,
    handleCardClick,
    handleDelete,
    user._id,
    popupForDelete,
    api.deleteLike.bind(api),
    api.setLike.bind(api)
  );
  return card.render();
}

function handleCardClick(cardData) {
  popupImage.open(cardData.name, cardData.link);
}

api.getInitialCards().then((data) => {
  data.forEach((cardData) => {
    section.addItem(createCard(cardData));
  })
}).catch((err) => {
  console.log(err); 
});

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
  cardSubmit.textContent = loadingString 
  api.addCard(inputValues.imgName, inputValues.imgSrc).then((res) => {
    section.addItem(createCard(res));
    cardSubmit.textContent = 'Сохранить'
  }).catch((err) => {
    console.log(err); 
  });;

  evt.target.reset();
  cardValidator.disableSaveButton();
  cardValidator.clearValidationErrors();
}

function handleProfileFormSubmit(evt, inputValues) {
  evt.preventDefault();
  profileSubmit.textContent = loadingString 
  api
    .changeUserInfo(inputValues.profileName, inputValues.profileBio)
    .then((data) => {
      user.setUserInfo(data.name, data.about);
      profileSubmit.textContent = 'Сохранить'

    }).catch((err) => {
      console.log(err); 
    });;
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



const popupAvatar = new PopupWithForm(avatarPopupSelector, handleAvatarSubmit);
popupAvatar.setEventListeners();
const popupAvataralidator = new FormValidator(config,avatarPopup);
popupAvataralidator.enableValidation()
avatarButton.addEventListener("click", () => { 
  popupAvatar.open();
});

function handleAvatarSubmit(evt, inputValues) {
  evt.preventDefault();
  avatarSubmit.textContent = loadingString  
  api
    .changeAvatar(inputValues.imgSrc)
    .then((data) => {
      user.setUserInfo(data.name, data.about, data.avatar, data._id);
      avatarSubmit.textContent = 'Сохранить'
    }).catch((err) => {
      console.log(err); 
    });;
    
  
}

