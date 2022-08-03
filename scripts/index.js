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
const likeButton = document.querySelector(".elements__icon");
const deleteButton = document.querySelector(".elements__delete-button");
const elementTemplate = document.querySelector(".element-template").content;
const imagePopup = document.querySelector(".popup-image");
const imagePicture = document.querySelector(".popup__img");
const imageCaption = document.querySelector(".popup__caption");
const closeButtons = document.querySelectorAll('.popup__cross');

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
    openPopup(imagePopup);
    imagePicture.src = item.link;
    imageCaption.textContent = item.name;

    imagePicture.alt = item.name;
  });

  return element;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

initialCards.forEach((item) => {
  const card = createCard(item);
  elementsList.append(card);
});

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  spansErrorsReset(profilePopup);
  inputsInvalidReset(profilePopup);
});

addButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

document.querySelector("#card_form").addEventListener("submit", addCard);
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
}

function closeNameForm() {
  const openedPopup = document.querySelector(".popup_opened");
  closePopup(openedPopup);
  spansErrorsReset(cardPopup);
  inputsInvalidReset(cardPopup);
  
}

const buttons = document.getElementsByClassName("popup__cross");
for (let i = 0; i < buttons.length; i++) {
  console.log(buttons[i].parentNode.parentNode.classList);
  buttons[i].addEventListener("click", closeNameForm);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeNameForm();
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

profileCloseButton.addEventListener("click", () => closePopup(profilePopup));
cardCloseButton.addEventListener("click", () => closePopup(cardPopup));
imageCloseButton.addEventListener("click", () => closePopup(imagePopup));



function spansErrorsReset (popup) {
  const spans = Array.from(popup.querySelectorAll('.popup__input-error'));
  spans.forEach((span) => span.textContent = '');
}

function inputsInvalidReset (popup) {
  const inputs = Array.from(popup.querySelectorAll('.popup__item'));
  inputs.forEach((input) => input.classList.remove('popup__item_type_invalid'));
}

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeNameForm();
    }   
  });


  function closePopupOnClick(event, popup) {
    if (event.target === popup) {
      closeNameForm(popup);
    }
  }

  closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {closeNameForm(popup);});
  popup.addEventListener('click', (event) => {closePopupOnClick(event, popup);});
});


  

