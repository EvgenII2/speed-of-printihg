import "./InfoComponent.css";

function InfoComponent({ title, value, unit }) {
    return (
        <p className="TextComponent">
            {`${title}: ${value ? value : ' - '} ${unit}`}
        </p>
    );
}

export default InfoComponent;