function EditAvatar() {
  return (
    <form className="popup__form" noValidate>
      <input
        id="avatar-input"
        className="popup__input popup__input_content_link"
        type="url"
        name="avatar"
        placeholder="Link de imagem"
        required
      />
      <span className="avatar-input-error popup__input-error"></span>
      <button id="avatar-button" className="popup__submit-button" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
