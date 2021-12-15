import "./InfoComponent.css";

function InfoComponent({ title, value, unit }) {
    return (
        <p className="InfoComponent">
            <span className="InfoComponent__title">{title}:</span>
            <span className="InfoComponent__value">
                {` ${(value && !isNaN(value)) ? value : " - "} ${unit}`}
            </span>
        </p>
    );
}

export default InfoComponent;
