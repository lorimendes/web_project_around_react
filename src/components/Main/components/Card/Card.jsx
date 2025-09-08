import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";

function Card({ name, link, onOpen, isLiked }) {
  return (
    <li className="gallery__photo-card">
      <img
        className="gallery__photo"
        src={link}
        alt="Foto do local"
        onClick={() =>
          onOpen({
            children: <ImagePopup name={name} link={link} />,
          })
        }
      />
      <div className="gallery__photo-info">
        <p className="gallery__photo-caption">{name}</p>
        <button
          className="gallery__like-button"
          aria-label="Curtir card"
        ></button>
        <button
          className="gallery__remove-button"
          aria-label="Remover card"
        ></button>
      </div>
    </li>
  );
}

export default Card;
