import "./StartPopup";

function StartPopup({ isOpen, onClose }) {
    return isOpen ? (
        <div className={"StartPopup StartPopup_visible"}>
            <div className="StartPopup__container">
                <h2 className="StartPopup__title">
                    Are you ready?
                </h2>
                <button
                    aria-label="закрыть"
                    type="button"
                    className="StartPopup__button-start"
                    onClick={onClose}
                >
                    Start
                </button>
            </div>
        </div>
    ) : (
        <div className={"StartPopup"} />
    );
}

export default StartPopup;
