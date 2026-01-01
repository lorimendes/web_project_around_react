import logo from "../images/Vector.png";
import avatar from "../images/Jacques-Cousteau.jpg";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({}); //pq criar essa variável nesse arquivo e não no "Main"?
  const [popup, setPopup] = useState(null);

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
      await api
        .updateProfile(
          "https://around-api.pt-br.tripleten-services.com/v1/users/me",
          userInfo
        )
        .then((newUserInfo) => {
          setCurrentUser(newUserInfo);
          handleClosePopup();
        });
    })();
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
      <div className="page">
        <Header src={logo} />
        <Main
          src={avatar}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
