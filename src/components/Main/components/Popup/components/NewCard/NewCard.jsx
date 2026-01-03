import { useContext, useState, useRef, useEffect } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import { FormValidator } from "../../../../../../utils/formValidator";

function NewCard() {
  const { handleAddCardSubmit } = useContext(CurrentUserContext);
  const [name, setName] = useState();
  const [link, setLink] = useState();
  const formRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddCardSubmit({ name, link });
  };

  useEffect(() => {
    const formValidator = new FormValidator(formRef.current);
    formValidator.enableValidation();
  }, []);

  return (
    <form
      ref={formRef}
      className="popup__form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="title-input"
        className="popup__input popup__input_content_title-card"
        type="text"
        minLength="2"
        maxLength="30"
        name="name"
        placeholder="Título"
        onChange={(event) => setName(event.target.value)}
        required
      />
      <span className="title-input-error popup__input-error"></span>
      <input
        id="link-input"
        className="popup__input popup__input_content_link"
        type="url"
        name="link"
        placeholder="Link de imagem"
        onChange={(event) => setLink(event.target.value)}
        required
      />
      <span className="link-input-error popup__input-error"></span>
      <button
        id="add-card-button"
        className="popup__submit-button"
        type="submit"
      >
        Criar
      </button>
    </form>
  );
}

export default NewCard;
