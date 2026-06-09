import { useState } from 'react';
import CircleCanvas from './components/CircleCanvas';
import Toolbar from './components/Toolbar';
import type { Circle, Tangent } from './types';
import { getAllTangents } from './utils/geometry';

function App() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [tangents, setTangents] = useState<Tangent[]>([]);
  const [draftReset, setDraftReset] = useState(0);

  const removeLastCircle = () => {
    setCircles((prev) => prev.slice(0, -1));
    setTangents([]);
  };

  const clearAll = () => {
    setCircles([]);
    setTangents([]);
    setDraftReset((n) => n + 1);
  };

  const drawTangents = () => {
    setTangents(getAllTangents(circles));
  };

  return (
    <div className="app">
      <h1>Canvas</h1>

      <Toolbar
        circleCount={circles.length}
        onRemoveLast={removeLastCircle}
        onClearAll={clearAll}
        onDrawTangents={drawTangents}
      />

      <CircleCanvas
        key={draftReset}
        circles={circles}
        setCircles={setCircles}
        tangents={tangents}
      />

      <p className="hint">
        Klikni pro střed kružnice, pohyb myší nastaví poloměr, druhý klik
        kružnici uloží.
      </p>
    </div>
  );
}

export default App;