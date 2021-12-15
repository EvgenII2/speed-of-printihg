import "./Popup";

function Popup({ isOpen, message, onClose, buttonTitle = "Ok" }) {
    return isOpen ? (
        <div className={"Popup Popup_visible"}>
            <div className="Popup__container">
                <h2 className="Popup__title">
                    {message}
                </h2>
                <button
                    aria-label="закрыть"
                    type="button"
                    className="Popup__button-start"
                    onClick={onClose}
                >
                    {buttonTitle}
                </button>
            </div>
        </div>
    ) : (
        <div className={"Popup"} />
    );
}

export default Popup;
