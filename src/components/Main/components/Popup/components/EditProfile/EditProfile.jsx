function EditProfile() {
  return (
    <form className="popup__form" noValidate>
      <input
        id="name-input"
        className="popup__input popup__input_content_name"
        type="text"
        minLength="2"
        maxLength="40"
        name="name"
        placeholder="Nome"
        required
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        id="about-input"
        className="popup__input popup__input_content_about"
        type="text"
        minLength="2"
        maxLength="200"
        name="about"
        placeholder="Sobre mim"
        required
      />
      <span className="about-input-error popup__input-error"></span>
      <button
        id="edit-profile-button"
        className="popup__submit-button"
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
}

export default EditProfile;
