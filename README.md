# Kreslení kružnic — Fiosoft úkol

React aplikace pro interaktivní kreslení kružnic na canvasu a výpočet jejich společných tečen.

## Spuštění

```bash
npm install
npm run dev
```

Aplikace běží na http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Použití

1. Kliknutí na canvas určí střed kružnice
2. Pohyb myší nastaví poloměr (náhled čárkovanou kružnicí)
3. Druhý klik kružnici uloží
4. Můžeme opakovat pro další kružnice
5. Tlačítko „Vykreslit tečny" spočítá a vykreslí společné tečny pro všechny páry kružnic

## Technologie

- React 19 + TypeScript
- Vite
- HTML Canvas API
- Geometrie v `src/utils/geometry.ts` (odděleně od UI)

## Struktura

```
src/
  App.tsx              — stav aplikace
  components/
    CircleCanvas.tsx   — canvas, kreslení, interakce
    Toolbar.tsx        — ovládací tlačítka
  utils/
    geometry.ts        — výpočet společných tečen
  types.ts             — Circle, Tangent
```
