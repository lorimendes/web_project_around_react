import logo from "../images/Vector.png";
import avatar from "../images/Jacques-Cousteau.jpg";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

function App() {
  return (
    <div className="page">
      <Header src={logo} />
      <Main src={avatar} />
      <Footer />
    </div>
  );
}

export default App;
