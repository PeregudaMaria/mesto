export default class UserInfo {
    constructor(nameSelector, bioSelector) {
      this._nameSelector = nameSelector;
      this._bioSelector = bioSelector;
      this._profileName = document.querySelector(this._nameSelector);
      this._profileBio = document.querySelector(this._bioSelector);
    }

    setUserInfo(name, bio) {
        this._profileName.textContent = name;
        this._profileBio.textContent = bio;
    }

    getUserInfo() {
            return {
              name: this._name.textContent,
              bio: this._bio.textContent,}
          }

}