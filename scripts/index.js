const popupElement = document.querySelector(".popup");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const popupCloseButtonElement = popupElement.querySelector(".popup__cross");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__status");
const formElement = popupElement.querySelector(".popup__container");
const nameInput = formElement.querySelector(".popup__name");
const jobInput = formElement.querySelector(".popup__job");

const openPopup = function () {
  popupElement.classList.add("popup__opened");
  console.log("open popup clicked");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};
const closePopup = function () {
  popupElement.classList.remove("popup__opened");
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
