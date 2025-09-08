function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
        <img
          className="header__logo"
          src={props.src}
          alt="Logo Around The U.S."
        />
        <div className="header__line"></div>
      </div>
    </header>
  );
}

export default Header;
