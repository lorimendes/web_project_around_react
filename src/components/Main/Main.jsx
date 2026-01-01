import { useContext, useEffect, useState } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import Card from "./components/Card/Card.jsx";
import { api } from "../../utils/api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main(props) {
  const [cards, setCards] = useState();
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = { title: "Novo Local", children: <NewCard /> };
  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  async function handleCardLike(card) {
    try {
      const updatedCard = await api.updateLike(
        `https://around-api.pt-br.tripleten-services.com/v1/cards/${card._id}/likes`,
        card
      );
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id == card._id ? updatedCard : currentCard
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    api
      .getInfoFromApi(
        "https://around-api.pt-br.tripleten-services.com/v1/cards/"
      )
      .then((cardsFromApi) => {
        setCards(cardsFromApi);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser && currentUser.avatar}
            alt="Foto do usuário"
          />
          <button
            className="profile__avatar-button"
            type="button"
            onClick={() => props.onOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <p className="profile__about">{currentUser?.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => {
              props.onOpenPopup(editProfilePopup);
            }}
          ></button>
        </div>
        <button
          className="profile__add-button"
          onClick={() => props.onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <ul className="gallery">
        {cards &&
          cards.map((card) => {
            return (
              <Card
                key={card._id}
                name={card.name}
                link={card.link}
                isLiked={card.isLiked}
                onOpen={props.onOpenPopup}
                onCardLike={() => handleCardLike(card)}
              />
            );
          })}
      </ul>
      {props.popup && (
        <Popup onClose={props.onClosePopup} title={props.popup.title}>
          {props.popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
