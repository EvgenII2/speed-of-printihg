import "./Popup.css";

function Popup({ isOpen, message, onClick, buttonTitle = "Ok" }) {
    return isOpen ? (
        <div className={"Popup"}>
            <div className="Popup__container">
                <h2 className="Popup__title">
                    {message}
                </h2>
                <button
                    aria-label="закрыть"
                    type="button"
                    className="Popup__button"
                    onClick={onClick}
                >
                    {buttonTitle}
                </button>
            </div>
        </div>
    ) : (
        <div className={"Popup_unvisible"} />
    );
}

export default Popup;
