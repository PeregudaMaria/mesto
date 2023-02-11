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
    user.setUserInfo(userData);
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
    .deleteCard(card.id)
    .then(() => {
      popupForDelete.close();
      card.delete();
    })
    .catch((err) => console.log(err));
}

function handleDelete(card) {
  popupForDelete.open();
  popupForDelete.setupCard(card);
}

function handleLike(card) {
  if (card.isLiked) {
    api
      .deleteLike(card.id)
      .then((data) => {
        card.setLikesCount(data.likes.length);
        card.toggleLike();
      })
      .catch((err) => console.log(err));
  } else {
    api
      .setLike(card.id)
      .then((data) => {
        card.setLikesCount(data.likes.length);
        card.toggleLike();
      })
      .catch((err) => console.log(err));
  }
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    cardTemplate,
    handleCardClick,
    handleDelete,
    user._id,
    popupForDelete,
    handleLike
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
  popupCard.renderLoading(true);
  api
    .addCard(inputValues.imgName, inputValues.imgSrc)
    .then((res) => {
      section.addItem(createCard(res));
      popupCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCard.renderLoading(false);
    });
}

function handleProfileFormSubmit(evt, inputValues) {
  evt.preventDefault();
  popupProfile.renderLoading(true);
  api
    .changeUserInfo(inputValues.profileName, inputValues.profileBio)
    .then((data) => {
      user.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
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
  popupAvatarValidator.disableSaveButton();
  popupAvatarValidator.clearValidationErrors();
});

function handleAvatarSubmit(evt, inputValues) {
  evt.preventDefault();
  popupAvatar.renderLoading(true);
  api
    .changeAvatar(inputValues.imgSrc)
    .then((data) => {
      user.setUserInfo({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        id: data._id,
      });
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
}
