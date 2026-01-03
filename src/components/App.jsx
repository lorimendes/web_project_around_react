import logo from "../images/Vector.png";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({}); //pq criar essa variável nesse arquivo e não no "Main"?
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState();

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    (async () => {
      await api
        .getInfoFromApi(
          "https://around-api.pt-br.tripleten-services.com/v1/users/me"
        )
        .then((userInfo) => {
          setCurrentUser(userInfo);
        });
    })();
  }, []);

  const handleUpdateUser = (userInfo) => {
    (async () => {
      await api.updateProfile(userInfo).then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (avatar) => {
    (async () => {
      await api.updateAvatar(avatar).then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        handleClosePopup();
      });
    })();
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

  const handleAddCardSubmit = (newCard) => {
    (async () => {
      await api.postCard(newCard).then((newCard) => {
        handleClosePopup();
        setCards([newCard, ...cards]);
      });
    })();
  };

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
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddCardSubmit,
      }}
    >
      <div className="page">
        <Header src={logo} />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          cards={cards}
          onCardLike={handleCardLike}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
