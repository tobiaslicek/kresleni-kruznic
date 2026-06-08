import { useState } from 'react';
import CircleCanvas from './components/CircleCanvas';
import Toolbar from './components/Toolbar';
import type { Circle } from './types';

function App() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [draftReset, setDraftReset] = useState(0);

  const removeLastCircle = () => {
    setCircles((prev) => prev.slice(0, -1));
  };

  const clearAll = () => {
    setCircles([]);
    setDraftReset((n) => n + 1);
  };

  return (
    <div className="app">
      <h1>Canvas</h1>

      <Toolbar
        circleCount={circles.length}
        onRemoveLast={removeLastCircle}
        onClearAll={clearAll}
      />

      <CircleCanvas
        key={draftReset}
        circles={circles}
        setCircles={setCircles}
      />

      <p className="hint">
        Klikni pro střed kružnice, pohyb myší nastaví poloměr, druhý klik
        kružnici uloží.
      </p>
    </div>
  );
}

export default App;
