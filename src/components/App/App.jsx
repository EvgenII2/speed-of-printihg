import "./App.css";

import React from "react";
import Popup from "../Popup/Popup";
import InfoComponent from "../InfoComponent/InfoComponent";
import TextComponent from "../TextComponent/TextComponent";

import textApi from "../../utils/TextApi";
import { SERVICE_KEY_CODES } from "../../utils/ServiceKeyCodes";

function App() {
    const [time, setTime] = React.useState(0);
    const [speed, setSpeed] = React.useState(0);
    const [accuracy, setAccuracy] = React.useState(0);
    const [isStart, setIsStart] = React.useState(true);
    const [isFinish, setIsFinish] = React.useState(false);
    const [textLength, setTextLength] = React.useState(0);
    const [finishTime, setFinishTime] = React.useState(0);
    const [printedText, setPrintedText] = React.useState("");
    const [textToPrint, setTextToPrint] = React.useState("");
    const [isUncorrect, setIsUncorrect] = React.useState(false);
    const [isTimerActive, setIsTimerActive] = React.useState(false);
    const [currentSymbol, setCurrentSymbol] = React.useState("");
    const [numberOfSymbols, setNumberOfSymbols] = React.useState(0);
    const [numberOfUncorrectSymbols, setNumberOfUncorrectSymbols] = React.useState(0);

    const getText = () => {
        textApi.getText()
            .then((res) => {
                const resString = res.toString().replace(/\s+/g, " ");
                setTextToPrint(resString);
                setTextLength(resString.length - 1);
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };

    const changeStatesToStartValues = () => {
        setTime(0);
        setSpeed(0);
        setAccuracy(0);
        setIsStart(true);
        setIsFinish(false);
        setTextLength(0);
        setFinishTime(0);
        setPrintedText("");
        setTextToPrint("");
        setIsUncorrect(false);
        setIsTimerActive(false);
        setCurrentSymbol("");
        setNumberOfSymbols(0);
        setNumberOfUncorrectSymbols(0);
    }

    const onClickHandler = () => {
        changeStatesToStartValues();
        getText();
    };

    const onPressKeyHandler = React.useCallback((ev) => {
        if (!SERVICE_KEY_CODES.includes(ev.keyCode)) {
            const currentKey = ev.key;
            if (currentKey === currentSymbol && !isStart) {
                setPrintedText(printedText + currentKey);
                setTextToPrint(textToPrint?.substring(1));
                setNumberOfSymbols(numberOfSymbols + 1);
                setIsUncorrect(false);
                if (numberOfSymbols !== 0 && numberOfSymbols === textLength) {
                    setFinishTime(time);
                    setIsTimerActive(false);
                    setIsFinish(true);
                }
            } else {
                setNumberOfUncorrectSymbols(numberOfUncorrectSymbols + 1);
                setIsUncorrect(true);
            }
        }
    }, [
        time,
        currentSymbol,
        textToPrint,
        printedText,
        numberOfUncorrectSymbols,
        numberOfSymbols,
        isStart,
        textLength
    ]);

    React.useEffect(() => {
        document.addEventListener("keydown", onPressKeyHandler);
        return () => {
            document.removeEventListener("keydown", onPressKeyHandler);
        }
    }, [onPressKeyHandler]);

    React.useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        }
    }, [isTimerActive, time]);

    React.useEffect(() => {
        getText();
    }, []);

    React.useEffect(() => {
        if (!isStart) {
            setSpeed((numberOfSymbols / time * 60).toFixed(2));
        }
    }, [numberOfSymbols, isStart, time]);

    React.useEffect(() => {
        if (textToPrint !== undefined) {
            setCurrentSymbol(textToPrint.charAt(0));
        }
    }, [textToPrint]);

    React.useEffect(() => {
        setAccuracy((100 - numberOfUncorrectSymbols / (numberOfSymbols + numberOfUncorrectSymbols) * 100).toFixed(2));
    }, [numberOfSymbols, numberOfUncorrectSymbols]);

    const closeStartPopup = () => {
        setIsStart(false);
        setIsTimerActive(true);
    }

    const closeFinishPopup = () => {
        changeStatesToStartValues();
        getText();
    }

    return (
        <div className={isUncorrect ? "App App__error" : "App"}>
            <Popup
                isOpen={isStart}
                message="Are you ready?"
                onClick={closeStartPopup}
                buttonTitle="Start"
            />
            <Popup
                isOpen={isFinish}
                message={`You entered ${numberOfSymbols} symbols to ${finishTime} sec. Your speed is ${speed} sym/min. Your accuracy is ${accuracy}%.`}
                onClick={closeFinishPopup}
            />
            <h1 className="App__header">
                Speed of printing
            </h1>
            <div className="App__main">
                <TextComponent
                    printedText={printedText}
                    textToPrint={textToPrint}
                />
                <div className="App__info-column">
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
            </div>
            <button
                className="App__button"
                onClick={onClickHandler}
            >
                Another text
            </button>
        </div>
    );
}

export default App;
