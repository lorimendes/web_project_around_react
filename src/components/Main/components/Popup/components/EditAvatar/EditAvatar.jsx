import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        ref={avatarRef}
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
