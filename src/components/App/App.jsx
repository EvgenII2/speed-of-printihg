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
  const [accuracy, setAccuracy] = React.useState(100);

  const getText = () => {
    textApi.getText()
      .then((res) => {
        setTextToPrint(res.toString());
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  const pressKeyHandler = React.useCallback((ev) => {
    const currentKey = ev.key;
    if (currentKey === currentSymbol) {
      setPrintedText(printedText + currentKey);
      setTextToPrint(textToPrint?.substring(1));
    }
  }, [currentSymbol, textToPrint, printedText]);

  React.useEffect(() => {
    document.addEventListener('keydown', pressKeyHandler);
    return () => {
      document.removeEventListener('keydown', pressKeyHandler);
    }
  }, [pressKeyHandler])

  useEffect(() => {
    getText();
  }, []);

  useEffect(() => {
    if (textToPrint !== undefined)
      setCurrentSymbol(textToPrint.charAt(0));

  }, [textToPrint]);

  useEffect(() => {
    console.log(currentSymbol, 'currentSymbol');
  }, [currentSymbol]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Test speed of printing
        </p>
      </header>
      <TextComponent textToPrint={textToPrint} />
      <div>
        <InfoComponent title='Time' value={time} unit='sec.' />
        <InfoComponent title='Speed' value={speed} unit='sym/min' />
        <InfoComponent title='You entered' value={numberOfSymbols} unit='symbols' />
        <InfoComponent title='Accuracy' value={accuracy} unit='%' />
      </div>
      <button onClick={getText}>
        New text
      </button>
    </div>
  );
}

export default App;
