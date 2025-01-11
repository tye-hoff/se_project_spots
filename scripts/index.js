const initialCards = [
  {
    name: " Val Thorens",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: " Restaurant terrace",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg ",
  },
  {
    name: " An outdoor cafe",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: " A very long bridge, over the forest and through the trees",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: " Tunnel with morning light",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: " Mountain house",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalButton = document.querySelector(".profile__add-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const editProfileModalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editModalNameInput = editProfileModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardLinkEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  cardNameEl.textContent = data.name;
  cardLinkEl.src = data.link;
  cardLinkEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  })

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(editModalNameInput.value);
  console.log(editModalDescriptionInput.value);
  const inputValues = { name: editModalNameInput.value, link: editModalDescriptionInput.value };
  const cardEl = getCardElement(inputValues);
  cardsList.prepend(cardEl);
  evt.target.reset();
  closeModal(cardModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileModalNameInput.value;
  profileDescription.textContent = editProfileModalDescriptionInput.value;
  closeModal(editProfileModal);
}

cardModalButton.addEventListener("click", () =>{
  openModal(cardModal);
})

cardModalCloseBtn.addEventListener("click", () =>{
  closeModal(cardModal);
})

profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  editProfileModalNameInput.value = profileNameElement.textContent;
  editProfileModalDescriptionInput.value = profileDescription.textContent;
});

editProfileModalCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item) => {
  console.log(item);
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
