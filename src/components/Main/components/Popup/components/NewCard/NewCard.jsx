function NewCard() {
  return (
    <form className="popup__form" noValidate>
      <input
        id="title-input"
        className="popup__input popup__input_content_title-card"
        type="text"
        minLength="2"
        maxLength="30"
        name="name"
        placeholder="Título"
        required
      />
      <span className="title-input-error popup__input-error"></span>
      <input
        id="link-input"
        className="popup__input popup__input_content_link"
        type="url"
        name="link"
        placeholder="Link de imagem"
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
