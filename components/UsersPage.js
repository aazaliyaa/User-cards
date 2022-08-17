const config = {
  url: "https://randomuser.me/api/",
  totalUsers: 24,
};

class UsersPage extends HTMLElement {
  constructor() {
    super();
    this.users = [];
    this.totalAmountOfUsers = config.totalUsers;
    this.amountOfShownUsers = 0;
    this.innerHTML = `
            <div class="box">
                <p class="fetch__label">Total amount of users</p>
                <div class="fetch__inputs">
                    <input class="fetch__amount"></input>
                    <button class="fetch__button">Fetch users</button>
                </div>
                <div class="wrapper"></div>
                <div class="more">Show more...</div>
                <button class="delete__button">Delete cards</button>
            </div>`;
  }

  onShowMoreClick = this.onShowMoreClick.bind(this);
  onDeleteClick = this.onDeleteClick.bind(this);
  onFetchUsersClick = this.onFetchUsersClick.bind(this);
  onInputChange = this.onInputChange.bind(this);

  fetchAndCreateCards() {
    fetch(`${config.url}?results=${this.totalAmountOfUsers}`)
      .then((response) => {
        return response.json();
      })
      .then((apiResponse) => {
        this.users = apiResponse.results;
        this.createCards();
      });
  }

  createCards() {
    if (this.totalAmountOfUsers == 0) {
      return;
    }
    const wrapper = this.querySelector(".wrapper");

    this.users
      .slice(this.amountOfShownUsers, this.amountOfShownUsers + 4)
      .map((user) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.innerHTML = `<user-card></user-card>`;
        let userCard = card.querySelector("user-card");
        userCard.user = user;
        wrapper.appendChild(card);
      });

    this.amountOfShownUsers += 4;
  }

  onInputChange(e) {
    this.totalAmountOfUsers = e.target.value;

    if (this.totalAmountOfUsers > 300) {
      alert(`You can fetch no more than 300 users`);
      e.target.value = "";
    }
  }

  onFetchUsersClick() {
    if (document.querySelector(".fetch__amount").value.length == 0) {
      alert("Fill the number of users you want to fetch");
      return;
    }
    this.querySelector(".wrapper").innerHTML = "";
    this.amountOfShownUsers = 0;
    this.fetchAndCreateCards();
  }

  onShowMoreClick() {
    if (this.amountOfShownUsers >= this.totalAmountOfUsers) {
      alert(`Total amount of users ${this.totalAmountOfUsers}`);
      return;
    }

    this.createCards();
  }

  onDeleteClick() {
    this.removeCardEventListeners();
    this.querySelector(".wrapper").innerHTML = "";
    this.amountOfShownUsers = 0;
    this.totalAmountOfUsers = 0;
    document.querySelector(".fetch__amount").value = "";
  }

  addEventListeners() {
    const moreButton = this.querySelector(".more");
    moreButton.addEventListener("click", this.onShowMoreClick);

    const deleteButton = this.querySelector(".delete__button");
    deleteButton.addEventListener("click", this.onDeleteClick);

    const totalAmountInput = this.querySelector(".fetch__amount");
    totalAmountInput.addEventListener("input", this.onInputChange);

    const fetchButton = this.querySelector(".fetch__button");
    fetchButton.addEventListener("click", this.onFetchUsersClick);
  }

  removeEventListeners() {
    const moreButton = this.querySelector(".more");
    moreButton.removeEventListener("click", this.onShowMoreClick);

    const deleteButton = this.querySelector(".delete__button");
    deleteButton.removeEventListener("click", this.onDeleteClick);

    const totalAmountInput = this.querySelector(".fetch__amount");
    totalAmountInput.removeEventListener("input", this.onInputChange);

    const fetchButton = this.querySelector(".fetch__button");
    fetchButton.removeEventListener("click", this.onFetchUsersClick);
  }

  removeCardEventListeners() {
    const buttons = this.querySelectorAll(".card__call-button");
    buttons.forEach((button) => {
      button.removeEventListener("click", this.onCallClick);
    });
  }

  connectedCallback() {
    this.addEventListeners();
    this.fetchAndCreateCards();
  }

  disconnectedCallback() {
    this.removeEventListeners();
    this.removeCardEventListeners();
  }
}

window.customElements.define("users-page", UsersPage);
