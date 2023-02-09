import { avatarSelector } from "../utils/constants";

export default class UserInfo {
  constructor(nameSelector, bioSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileBio = document.querySelector(this._bioSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  setUserInfo(name, bio, avatar, id) {
    this._profileName.textContent = name;
    this._profileBio.textContent = bio;
    if (avatar != undefined) {
      this._avatarSelector.src = avatar;
    }
    this._id = id

  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent,
    };
  }
}
