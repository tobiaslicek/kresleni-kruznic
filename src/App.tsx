import { useCallback, useState, type SetStateAction } from 'react';
import CircleCanvas from './components/CircleCanvas';
import Toolbar from './components/Toolbar';
import type { Circle, DrawingPhase, Tangent } from './types';
import { getAllTangents } from './utils/geometry';

function App() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [tangents, setTangents] = useState<Tangent[]>([]);
  const [draftReset, setDraftReset] = useState(0);
  const [drawingPhase, setDrawingPhase] = useState<DrawingPhase>('center');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleDrawingPhaseChange = useCallback((phase: DrawingPhase) => {
    setDrawingPhase(phase);
  }, []);

  const updateCircles = (updater: SetStateAction<Circle[]>) => {
    setCircles((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (next.length !== prev.length) {
        setTangents([]);
        setStatusMessage(null);
      }
      return next;
    });
  };

  const removeLastCircle = () => {
    setCircles((prev) => prev.slice(0, -1));
    setTangents([]);
    setStatusMessage(null);
  };

  const clearAll = () => {
    setCircles([]);
    setTangents([]);
    setStatusMessage(null);
    setDraftReset((n) => n + 1);
  };

  const drawTangents = () => {
    const result = getAllTangents(circles);
    setTangents(result);
    setStatusMessage(
      result.length === 0
        ? 'Pro tyto kružnice neexistují společné tečny.'
        : `Vykresleno ${result.length} ${result.length === 1 ? 'tečna' : result.length < 5 ? 'tečny' : 'tečen'}.`,
    );
  };

  const phaseMessage =
    drawingPhase === 'center'
      ? 'Klikněte na canvas - určíte střed kružnice.'
      : 'Pohybem myši nastavte poloměr, druhým kliknutím kružnici uložíte.';

  return (
    <div className="app">
      <h1>Společné tečny kružnic</h1>

      <p className="hint">
        Nakreslete dvě nebo více kružnic, poté klikněte na Vykreslit tečny.
        Modré kružnice, červené tečny.
      </p>

      <p className="status" role="status">
        {statusMessage ?? phaseMessage}
      </p>

      <Toolbar
        circleCount={circles.length}
        onRemoveLast={removeLastCircle}
        onClearAll={clearAll}
        onDrawTangents={drawTangents}
      />

      <CircleCanvas
        key={draftReset}
        circles={circles}
        setCircles={updateCircles}
        tangents={tangents}
        onDrawingPhaseChange={handleDrawingPhaseChange}
      />
    </div>
  );
}

export default App;
