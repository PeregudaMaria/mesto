const profilePopup = document.querySelector(".popup-profile");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelector(".popup__cross");
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
const likeButton = document.querySelector(".elements__icon");
const deleteButton = document.querySelector(".elements__delete-button");
const elementTemplate = document.querySelector(".element-template").content;
const imagePopup = document.querySelector(".popup-image");
const imagePicture = document.querySelector(".popup__img");
const imageCaption = document.querySelector(".popup__caption");

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

function createCard(item) {
  const element = elementTemplate.cloneNode(true);
  const imageElement = element.querySelector(".elements__card-photo");
  const likeButton = element.querySelector(".elements__icon");
  const titleElement = element.querySelector(".elements__title");
  const deleteButton = element.querySelector(".elements__delete-button");

  imageElement.src = item.link;
  imageElement.alt = item.name;
  titleElement.textContent = item.name;

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__icon_active");
  });

  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".elements__card").remove();
  });

  imageElement.addEventListener("click", function () {
    imagePopup.classList.add("popup_opened");
    imagePicture.src = item.link;
    imageCaption.textContent = item.name;
  });

  closeButtons.addEventListener("click", function () {
    imagePopup.classList.remove("popup_opened");
  });

  return element;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

initialCards.forEach((item) => {
  const card = createCard(item);
  elementsList.append(card);
});

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

document.querySelector("#save_button").addEventListener("click", addCard);
function addCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const card = createCard(newCard);
  elementsList.prepend(card);
}

function closeNameForm() {
  popups = document.querySelector(".popup_opened");
  popups.classList.remove("popup_opened");
}

buttons = document.getElementsByClassName("popup__cross");
for (let i = 0; i < buttons.length; i++) {
  console.log(buttons[i].parentNode.parentNode.classList);
  buttons[i].addEventListener("click", closeNameForm);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeNameForm();
}
profileForm.addEventListener("submit", formSubmitHandler);
