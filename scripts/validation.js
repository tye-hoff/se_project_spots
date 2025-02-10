const settings = {
  formSelector: "modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button-disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",
};

const showInputError = (formElement, inputElement, errorMsg) => {
  const errorMsgID = inputElement.id + ".error";
  const errorMsgEl = formElement.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg;
  inputElement.classList.add("modal__input_state_error");
};

const hideInputError = (formElement, inputElement) => {
  const errorMsgID = inputElement.id + ".error";
  const errorMsgEl = formElement.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList, config)) {
    disableButton(buttonEl);
  } else {
    buttonElement.disabled = false;
    // remove disabled class
  }
};

const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  // add mod to buttonElement make it gray
};

const resetValidation = (formElement, inputList) => {
  inputList.forEach((input, config) => {
    hideInputError(formElement, input, config);
  });
  disableButton();
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputErrorClass)
  );
  const buttonElement = formElement.querySelectot(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement, config) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListener(formElement, config);
  });
};

enableValidation(settings);