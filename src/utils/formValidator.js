class FormValidator {
  constructor(form) {
    this._form = form;
  }

  _showError(input, errorMessage) {
    const inputError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add("popup__input_type_error");
    inputError.textContent = errorMessage;
    inputError.classList.add("popup__input-error_active");

    this._form.parentElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__close-button")) {
        this._hideError(input);
      }
    });
  }

  _hideError(input) {
    const inputError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove("popup__input_type_error");
    inputError.textContent = "";
    inputError.classList.remove("popup__input-error_active");
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add("popup__submit-button_inactive");
      button.setAttribute("disabled", "");
    } else {
      button.classList.remove("popup__submit-button_inactive");
      button.removeAttribute("disabled", "");
    }
  }

  _setInputEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    const button = this._form.querySelector(".popup__submit-button");
    this._toggleButtonState(inputList, button);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setInputEventListeners();
  }
}

export { FormValidator };
