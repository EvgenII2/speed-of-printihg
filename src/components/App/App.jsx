import React, { useEffect } from 'react';
import textApi from '../../utils/TextApi';
import InfoComponent from '../InfoComponent/InfoComponent';
import TextComponent from '../TextComponent/TextComponent';
import './App.css';

function App() {

  const [text, setText] = React.useState('');
  const [time, setTime] = React.useState(0);
  const [speed, setSpeed] = React.useState(0);
  const [numberOfSymbols, setNumberOfSymbols] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(100);

  const getText = () => {
    textApi.getText()
      .then((res) => {
        setText(res);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  useEffect(() => {
    getText();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Test speed of printing
        </p>
      </header>
      <TextComponent text={text} />
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
