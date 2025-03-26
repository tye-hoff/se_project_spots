// IMPORTS
import "./index.css";
import headerSrc from "../images/logo.svg";
import avatarSrc from "../images/avatar.jpg";
import pencilSrc from "../images/pencil-icon.svg";
import plusIconSrc from "../images/plus-icon.svg";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

// HTML SRC IMGS/ICONS FOR HEADER
const headerImg = document.getElementById("header-logo");
headerImg.src = headerSrc;
const avatarImg = document.getElementById("bessie-avatar");
avatarImg.src = avatarSrc;
const pencilImg = document.getElementById("pencil-icon");
pencilImg.src = pencilSrc;
const plusImg = document.getElementById("plus-icon");
plusImg.src = plusIconSrc;

// card array
// const initialCards = [
//   {
//     name: " Val Thorens",
//     link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: " Restaurant terrace",
//     link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg ",
//   },
//   {
//     name: " An outdoor cafe",
//     link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: " A very long bridge, over the forest and through the trees",
//     link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: " Tunnel with morning light",
//     link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: " Mountain house",
//     link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2aeab612-7a77-4be5-a21a-000b34a9bb0e",
    "Content-Type": "application/json",
  },
});

// destructure 2nd item in the callback of the .then()
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    console.log(cards);
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    avatarImg.src = userInfo.avatar;
    console.log(userInfo);
    profileNameElement.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    console.log(userInfo.name);

    // handle user's information
    // set the src of avatar img
    // set textContent of both textElements
  })
  .catch(console.error);

// PROFILE ELEMENTS
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalButton = document.querySelector(".profile__add-btn");
const avatarModalButton = document.querySelector(".profile__avatar-btn");
const profileNameElement = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// EDIT ELEMENTS
const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const editProfileModalCloseBtn =
  editProfileModal.querySelector(".modal__close-btn");
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// CARD MODAL ELEMENTS
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const cardCaptionInput = cardModal.querySelector("#add-card-name-input");

// AVATAR MODAL ELEMENTS
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// DELETE FORM ELEMENTS
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteModalCnclBtn = deleteModal.querySelector(".modal__submit-btn-cncl");

// CARD TEMP/LIST ELEMENTS
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const editCardEl = document.querySelector("#card-trash-btn");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = document.querySelector(
  ".modal__close-btn_type_preview"
);
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const modals = document.querySelectorAll(".modal");

// LET
let selectedCard;
let selectedCardId;

// FUNCTIONS
function handleCardDelete(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api.changeLikeStatus(id, isLiked).then((updatedCard) => {
    evt.target.classList.toggle("card__like-button_liked", updatedCard.isLiked)
  }).catch(console.error);
}

function handleImageClick(data) {
  previewModalImageEl.src = data.link;
  previewModalImageEl.alt = data.name;
  previewModalCaptionEl.textContent = data.name;
  openModal(previewModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardTrashBtn = cardElement.querySelector(".card__trash-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));
  cardTrashBtn.addEventListener("click", () =>
    handleCardDelete(cardElement, data._id)
  );
  cardImageEl.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapePress);
}

function handleEscapePress(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function handleAddCardSubmit(evt) {
  evt.preventDefault(settings);
  console.log(editModalNameInput.value);
  console.log(editModalDescriptionInput.value);
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };

  api.addCard(inputValues).then(() => {
    const cardEl = getCardElement(inputValues);
    cardsList.prepend(cardEl);
    evt.target.reset();
    disableButton(cardSubmitBtn, settings);
    closeModal(cardModal, settings);
  });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault(settings);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      console.log(data.avatar);
      // set avatar img src
    })
    .catch(console.error);
  //
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapePress);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const avatarSubmitBtn = evt.submitter;
  avatarSubmitBtn.textContent = "Saving...";
  setButtonText(avatarSubmitBtn, true, "Saving...", "Save");
  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      profileNameElement.textContent = data.editModalNameInput;
      profileDescription.textContent = data.editModalDescriptionInput;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(avatarSubmitBtn, false, "Saving...", "Save");
      // avatarSubmitBtn.textContent = "Save";
    });
}

// CLICK HANDLERS

// CARD MODAL OPEN/CLOSE
cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});
cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

// PREVIEW MODAL
previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

// DELETE MODAL CLOSE-BTN/CNCL-BTN
deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});
deleteModalCnclBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

// AVTR MODAL OPEN/CLOSE
avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  editModalNameInput.value = profileNameElement.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    cardSubmitBtn,
    settings
  );
});

editProfileModalCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

// SUBMIT EVT LISTENERS
editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

// MOUSEDOWN
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);
