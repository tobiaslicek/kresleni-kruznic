import CircleCanvas from './components/CircleCanvas';

function App() {
  return (
    <div className="app">
      <h1>Canvas</h1>
      <CircleCanvas />
      <p className="hint">
        Klikni pro střed kružnice, pohyb myší nastaví poloměr, druhý klik
        kružnici uloží.
      </p>
    </div>
  );
}

export default App;
