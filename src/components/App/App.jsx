import React, { useEffect } from 'react';
import textApi from '../../utils/TextApi';
import InfoComponent from '../InfoComponent/InfoComponent';
import TextComponent from '../TextComponent/TextComponent';
import './App.css';

function App() {

  const [textToPrint, setTextToPrint] = React.useState('');
  const [currentSymbol, setCurrentSymbol] = React.useState('');
  const [printedText, setPrintedText] = React.useState('');
  const [time, setTime] = React.useState(0);
  const [speed, setSpeed] = React.useState(0);
  const [numberOfSymbols, setNumberOfSymbols] = React.useState(0);
  const [numberOfUncorrectSymbols, setNumberOfUncorrectSymbols] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(100);

  const getText = () => {
    textApi.getText()
      .then((res) => {
        setTextToPrint(res.toString().replace(/\s+/g, ' '));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };



  const changeTime = React.useCallback((ev) => {
    setTime(time + 1);
  }, [time]);

  const pressKeyHandler = React.useCallback((ev) => {
    const keyCodes = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 92, 93, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];
    console.log((ev.keyCode))
    if (!keyCodes.includes(ev.keyCode)) {
      const currentKey = ev.key;
      if (currentKey === currentSymbol) {
        setPrintedText(printedText + currentKey);
        setTextToPrint(textToPrint?.substring(1));
        setNumberOfSymbols(numberOfSymbols + 1);
      } else {
        setNumberOfUncorrectSymbols(numberOfUncorrectSymbols + 1)
      }
    }
  }, [currentSymbol, textToPrint, printedText, numberOfUncorrectSymbols, numberOfSymbols]);

  React.useEffect(() => {
    document.addEventListener('keydown', pressKeyHandler);
    return () => {
      document.removeEventListener('keydown', pressKeyHandler);
    }
  }, [pressKeyHandler]);

  React.useEffect(() => {
    let timer = setTimeout(() => { changeTime() }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [changeTime]
  );

  React.useEffect(() => {
    getText();
  }, []);

  React.useEffect(() => {
    setSpeed(numberOfSymbols / time * 60);
  }, [numberOfSymbols, time]);

  React.useEffect(() => {
    if (textToPrint !== undefined)
      setCurrentSymbol(textToPrint.charAt(0));

  }, [textToPrint]);

  React.useEffect(() => {
    setAccuracy(100 - numberOfUncorrectSymbols / numberOfSymbols);
  }, [numberOfSymbols, numberOfUncorrectSymbols]);

  return (
    <div className="App">
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
          title='Time'
          value={time}
          unit='sec.'
        />
        <InfoComponent
          title='Speed'
          value={speed}
          unit='sym/min'
        />
        <InfoComponent
          title='You entered'
          value={numberOfSymbols}
          unit='symbols'
        />
        <InfoComponent
          title='Accuracy'
          value={accuracy}
          unit='%'
        />
      </div>
      <button onClick={getText}>
        New text
      </button>
    </div>
  );
}

export default App;
