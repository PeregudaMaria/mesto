import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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
  avatarForm,
  elementsListSelector,
  profileForm,
  cardForm,
  cardTemplate,
  config,
  initialCards,
  cardDeleteSelector,
  saveString,
} from "../utils/constants.js";

const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "b62f355c-3b4c-496c-8d2e-ef61ddac11ed",
    "Content-Type": "application/json",
  },
};

const api = new Api(configApi);
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      section.addItem(createCard(cardData));
    },
  },
  elementsListSelector
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
    section.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

const user = new UserInfo(
  profileNameSelector,
  profileBioSelector,
  avatarSelector
);

const popupForDelete = new PopupWithSubmit(
  cardDeleteSelector,
  handleDeleteSubmit
);
popupForDelete.setEventListeners();

function handleDeleteSubmit(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      popupForDelete.close();
      card._delete();
    })
    .catch((err) => console.log(err));
}

function handleDelete(card) {
  popupForDelete.open();
  popupForDelete.setupCard(card);
}

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

const cardValidator = new FormValidator(config, cardForm);
const profileValidator = new FormValidator(config, profileForm);
cardValidator.enableValidation();
profileValidator.enableValidation();

function addCard(evt, inputValues) {
  evt.preventDefault();
  cardSubmit.textContent = loadingString;
  api
    .addCard(inputValues.imgName, inputValues.imgSrc)
    .then((res) => {
      section.addItem(createCard(res));
      this.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardSubmit.textContent = saveString;
    });
}

function handleProfileFormSubmit(evt, inputValues) {
  evt.preventDefault();
  profileSubmit.textContent = loadingString;
  api
    .changeUserInfo(inputValues.profileName, inputValues.profileBio)
    .then((data) => {
      user.setUserInfo(data.name, data.about);
      this.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmit.textContent = saveString;
    });
}

const popupCard = new PopupWithForm(cardPopupSelector, addCard);
popupCard.setEventListeners();
addButton.addEventListener("click", () => {
  popupCard.open();
  cardValidator.disableSaveButton();
  cardValidator.clearValidationErrors();
});

const popupProfile = new PopupWithForm(
  profilePopupSelector,
  handleProfileFormSubmit
);
popupProfile.setEventListeners();

editButton.addEventListener("click", () => {
  const { bio, name } = user.getUserInfo();
  popupProfile.fillInputValues({
    profileName: name,
    profileBio: bio,
  });
  popupProfile.open();
  console.log('disable')
  profileValidator.clearValidationErrors();
  profileValidator.disableSaveButton();
  
});

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

const popupAvatar = new PopupWithForm(avatarPopupSelector, handleAvatarSubmit);
popupAvatar.setEventListeners();

const popupAvatarValidator = new FormValidator(config, avatarForm);
popupAvatarValidator.enableValidation();
avatarButton.addEventListener("click", () => {
  popupAvatar.open();
  console.log('disable')
  popupAvatarValidator.disableSaveButton();
  popupAvatarValidator.clearValidationErrors();
  
});

function handleAvatarSubmit(evt, inputValues) {
  evt.preventDefault();
  avatarSubmit.textContent = loadingString;
  api
    .changeAvatar(inputValues.imgSrc)
    .then((data) => {
      user.setUserInfo(data.name, data.about, data.avatar, data._id);
      this.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmit.textContent = saveString;
    });
}
