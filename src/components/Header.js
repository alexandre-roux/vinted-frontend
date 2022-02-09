const Header = () => {
    return (
            <div className="header-container">
                <div className="header">
                    <img className="header-logo"
                         src="https://lereacteur-vinted.netlify.app/static/media/logo.3dcf8b02.png"
                         alt="vinted"/>
                    <button className="white-button">S'inscrire</button>
                    <button className="white-button">Se connecter</button>
                    <button className="green-button">Vends tes articles</button>
                </div>
            </div>
    );
};

export default Header;
