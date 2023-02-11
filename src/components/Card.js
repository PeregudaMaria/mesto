export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardClick,
    handleDelete,
    currentUserId,
    popupForDelete,
    handleLike
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
    this.id = cardData._id;
    this._isDeletable = this._owner._id == currentUserId;
    this.popupForDelete = popupForDelete;
    this._handleLike = handleLike;
    this.isLiked = false;
    cardData.likes.forEach((element) => {
      if (element._id == currentUserId) {
        this.isLiked = true;
      }
    });
  }

  setLikesCount(likesCount) {
    this.likesNumber.textContent = likesCount;
  }

  delete() {
    this._card.remove();
  }

  _setupEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike(this));
    this._deleteButton.addEventListener("click", () =>
      this._handleDelete(this)
    );
    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._cardData)
    );
  }

  toggleLike() {
    this._likeButton.classList.toggle("elements__icon_active");
    this.isLiked = !this.isLiked;
  }

  render() {
    const imageElement = this._cardTemplate.querySelector(
      ".elements__card-photo"
    );
    const titleElement = this._cardTemplate.querySelector(".elements__title");

    imageElement.src = this._cardData.link;
    imageElement.alt = this._cardData.name;
    titleElement.textContent = this._cardData.name;
    this.setLikesCount(this._likes);
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
