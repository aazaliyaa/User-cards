class UserCard extends HTMLElement {
  constructor() {
    super();

    this._user = {};
  }

  set user(value) {
    this._user = value;
  }

  get user() {
    return this._user;
  }

  connectedCallback() {
    this.innerHTML = `
    <div class='card__box'>
        <img class='card__image' src=${this.user.picture.large}></img>
        <p class='card__title'>${this.user.name.first} ${this.user.name.last}</p>
        <button class='card__call-button' phone=${this.user.phone}>call</button>
    </div>`;

    this.addEventListeners();
  }

  onCallClick() {
    alert(`User's phone number ${this.getAttribute("phone")}`);
  }

  addEventListeners() {
    const buttons = this.querySelectorAll(".card__call-button");
    buttons.forEach((button) => {
      button.addEventListener("click", this.onCallClick);
    });
  }
}

window.customElements.define("user-card", UserCard);
