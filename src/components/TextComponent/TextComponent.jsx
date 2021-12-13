import './TextComponent.css';

function TextComponent({ text }) {
    return (
        <div className="TextComponent">
            <p>
                {text}
            </p>
        </div>
    );
}

export default TextComponent;