import "./App.css";

import React from "react";
import StartPopup from "../StartPopup/StartPopup";
import InfoComponent from "../InfoComponent/InfoComponent";
import TextComponent from "../TextComponent/TextComponent";

import textApi from "../../utils/TextApi";
import { SERVICE_KEY_CODES } from "../../utils/ServiceKeyCodes";

function App() {
    const [time, setTime] = React.useState(0);
    const [speed, setSpeed] = React.useState(0);
    const [isStart, setIsStart] = React.useState(true);
    const [accuracy, setAccuracy] = React.useState(100);
    // const [isFinish, setIsFinish] = React.useState(true);
    const [printedText, setPrintedText] = React.useState("");
    const [textToPrint, setTextToPrint] = React.useState("");
    const [isUncorrect, setIsUncorrect] = React.useState(false);
    const [currentSymbol, setCurrentSymbol] = React.useState("");
    const [numberOfSymbols, setNumberOfSymbols] = React.useState(0);
    const [numberOfUncorrectSymbols, setNumberOfUncorrectSymbols] = React.useState(0);

    const getText = () => {
        textApi.getText()
            .then((res) => {
                setTextToPrint(res.toString().replace(/\s+/g, " "));
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };

    const changeTime = React.useCallback(() => {
        setTime(time + 1);
    }, [time]);

    const onClickHandler = () => {
        getText();
        setTime(0);
        setPrintedText("");
        setSpeed(0);
        setNumberOfSymbols(0);
        setNumberOfUncorrectSymbols(0);
        setAccuracy(100);
        setIsStart(true);
        setIsUncorrect(false);
    };

    const onPressKeyHandler = React.useCallback((ev) => {
        if (!SERVICE_KEY_CODES.includes(ev.keyCode)) {
            const currentKey = ev.key;
            if (currentKey === currentSymbol && !isStart) {
                setPrintedText(printedText + currentKey);
                setTextToPrint(textToPrint?.substring(1));
                setNumberOfSymbols(numberOfSymbols + 1);
                setIsUncorrect(false);
            } else {
                setNumberOfUncorrectSymbols(numberOfUncorrectSymbols + 1);
                setIsUncorrect(true);
            }
        }
    }, [currentSymbol, textToPrint, printedText, numberOfUncorrectSymbols, numberOfSymbols, isStart]);

    React.useEffect(() => {
        document.addEventListener("keydown", onPressKeyHandler);
        return () => {
            document.removeEventListener("keydown", onPressKeyHandler);
        }
    }, [onPressKeyHandler]);

    React.useEffect(() => {
        if (!isStart) {
            let timer = setTimeout(() => { changeTime() }, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [changeTime, isStart]);

    React.useEffect(() => {
        getText();
    }, []);

    React.useEffect(() => {
        if (!isStart) {
            setSpeed(numberOfSymbols / time * 60);
        }
    }, [numberOfSymbols, time, isStart]);

    React.useEffect(() => {
        if (textToPrint !== undefined)
            setCurrentSymbol(textToPrint.charAt(0));
    }, [textToPrint]);

    React.useEffect(() => {
        setAccuracy(100 - numberOfUncorrectSymbols / (numberOfSymbols + numberOfUncorrectSymbols) * 100);
    }, [numberOfSymbols, numberOfUncorrectSymbols]);

    return (
        <div className={isUncorrect ? "App App__error" : "App"}>
            <StartPopup
                isOpen={isStart}
                onClose={setIsStart}
            />
            <header className="App-header">
                <p>
                    Test speed of printing
                </p>
            </header>
            <TextComponent
                printedText={printedText}
                textToPrint={textToPrint}
            />
            <div>
                <InfoComponent
                    title="Time"
                    value={time}
                    unit="sec."
                />
                <InfoComponent
                    title="Speed"
                    value={speed}
                    unit="sym/min"
                />
                <InfoComponent
                    title="You entered"
                    value={numberOfSymbols}
                    unit="symbols"
                />
                <InfoComponent
                    title="Accuracy"
                    value={accuracy}
                    unit="%"
                />
            </div>
            <button onClick={onClickHandler}>
                New text
            </button>
        </div>
    );
}

export default App;
