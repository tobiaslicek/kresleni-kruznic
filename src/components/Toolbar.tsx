type ToolbarProps = {
  circleCount: number;
  onRemoveLast: () => void;
  onClearAll: () => void;
};

function Toolbar({ circleCount, onRemoveLast, onClearAll }: ToolbarProps) {
  const hasCircles = circleCount > 0;

  return (
    <div className="toolbar">
      <button type="button" disabled={!hasCircles} onClick={onRemoveLast}>
        Smazat poslední
      </button>

      <button type="button" disabled={!hasCircles} onClick={onClearAll}>
        Vymazat vše
      </button>

      <button type="button" disabled={circleCount < 2}>
        Vykreslit tečny
      </button>

      <span className="toolbar__count">Kružnic: {circleCount}</span>
    </div>
  );
}

export default Toolbar;
