import logo from "../images/Vector.png";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

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
    setIsLoading(true);
    (async () => {
      await api
        .updateProfile(userInfo)
        .then((newUserInfo) => {
          setCurrentUser(newUserInfo);
          handleClosePopup();
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    (async () => {
      await api
        .updateAvatar(avatar)
        .then((newUserInfo) => {
          setCurrentUser(newUserInfo);
          handleClosePopup();
        })
        .finally(() => {
          setIsLoading(false);
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

  const handleCardDeleteClick = (card) => {
    setCardToDelete(card);
  };

  const handleCardDeleteConfirm = () => {
    if (!cardToDelete) return;
    setIsLoading(true);
    (async () => {
      await api
        .deleteCard(
          `https://around-api.pt-br.tripleten-services.com/v1/cards/${cardToDelete._id}`
        )
        .then(() => {
          setCards(
            cards.filter((currentCard) => currentCard._id !== cardToDelete._id)
          );
          handleClosePopup();
        })
        .finally(() => {
          setIsLoading(false);
          setCardToDelete(null);
        });
    })();
  };

  const handleAddCardSubmit = (newCard) => {
    setIsLoading(true);
    (async () => {
      await api
        .postCard(newCard)
        .then((newCard) => {
          handleClosePopup();
          setCards([newCard, ...cards]);
        })
        .finally(() => {
          setIsLoading(false);
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
        handleCardDeleteConfirm,
        isLoading,
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
          onClickDeleteCard={handleCardDeleteClick}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
