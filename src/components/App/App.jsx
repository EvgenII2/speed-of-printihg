import React, { useEffect } from 'react';
import textApi from '../../utils/TextApi';
import TextComponent from '../TextComponent/TextComponent';
import './App.css';

function App() {

  const [text, setText] = React.useState('');

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
    getText()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Test speed of printing
        </p>
      </header>
      <TextComponent text={text} />
      <button onClick={getText}>
        New text
      </button>
    </div>
  );
}

export default App;
