import "./TextComponent.css";

function TextComponent({ printedText, textToPrint }) {
    return (
        <article className="TextComponent">
            <span className="TextComponent__printed-text">
                {printedText}
            </span>
            <span className="TextComponent__current-symbol">
                {textToPrint.charAt(0)}
            </span>
            <span className="TextComponent__text-to-print">
                {textToPrint.substr(1)}
            </span>
        </article>
    );
}

export default TextComponent;
