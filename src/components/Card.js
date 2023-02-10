export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardClick,
    handleDelete,
    currentUserId,
    popupForDelete,
    handleSetLike,
    handleDeleteLike
  ) {
    this._cardData = cardData;
    this._cardTemplate = cardSelector.cloneNode(true);
    this._likeButton = this._cardTemplate.querySelector(".elements__icon");
    this._deleteButton = this._cardTemplate.querySelector(
      ".elements__delete-button"
    );
    this._imageElement = this._cardTemplate.querySelector(
      ".elements__card-photo"
    );
    this.likesNumber = this._cardTemplate.querySelector(".elements__number");
    this._handleCardClick = handleCardClick;
    this._card = this._cardTemplate.querySelector(".elements__card");

    this._likes = cardData.likes.length;

    this._owner = cardData.owner;
    this._handleDelete = handleDelete;
    this._id = cardData._id;
    this._isDeletable = this._owner._id == currentUserId;
    this.popupForDelete = popupForDelete;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
    this.isLiked = false;
    cardData.likes.forEach((element) => {
      if (element._id == currentUserId) {
        this.isLiked = true;
      }
    });
  }

  _like() {
    if (!this._likeButton.classList.contains("elements__icon_active")) {
      this._handleDeleteLike(this._id)
        .then((data) => {
          this._setLikesCount(data.likes.length);
        })
        .then(() => this._likeButton.classList.toggle("elements__icon_active"))
        .catch((err) => console.log(err));
    } else {
      this._handleSetLike(this._id)
        .then((data) => {
          this._setLikesCount(data.likes.length);
        })
        .then(() => this._likeButton.classList.toggle("elements__icon_active"))
        .catch((err) => console.log(err));
    }
  }

  _setLikesCount(likesCount) {
    this.likesNumber.textContent = likesCount;
  }

  _delete() {
    this._card.remove();
  }

  _setupEventListeners() {
    this._likeButton.addEventListener("click", () => this._like());
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._cardData)
    );
  }

  render() {
    const imageElement = this._cardTemplate.querySelector(
      ".elements__card-photo"
    );
    const titleElement = this._cardTemplate.querySelector(".elements__title");

    imageElement.src = this._cardData.link;
    imageElement.alt = this._cardData.name;
    titleElement.textContent = this._cardData.name;
    this._setLikesCount(this._likes);
    this._deleteButton.setAttribute("card-id", this._id);
    if (!this._isDeletable) {
      this._deleteButton.style.display = "none";
    }
    if (this.isLiked) {
      this._likeButton.classList.toggle("elements__icon_active");
    }

    this._setupEventListeners();

    return this._cardTemplate;
  }
}
