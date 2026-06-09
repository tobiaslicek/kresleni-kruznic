# Kreslení kružnic

React aplikace pro interaktivní kreslení kružnic na canvasu a výpočet jejich společných tečen.

Aplikaci lze otevřít online na [tobiaslicek.github.io/kresleni-kruznic](https://tobiaslicek.github.io/kresleni-kruznic/).

## Spuštění

```bash
npm install
npm run dev
```

Adresa se zobrazí v terminálu (obvykle http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Adresa se zobrazí v terminálu (obvykle http://localhost:4173).

## Použití

1. Kliknutí na canvas určí střed kružnice
2. Pohyb myší nastaví poloměr (náhled čárkovanou kružnicí)
3. Druhý klik kružnici uloží
4. Opakujte pro další kružnice
5. Tlačítko „Smazat poslední" odstraní naposledy zakreslenou kružnici (a zruší vykreslené tečny)
6. Tlačítko „Vymazat vše" smaže všechny kružnice i tečny
7. Tlačítko „Vykreslit tečny" spočítá a vykreslí společné tečny pro všechny páry kružnic (vyžaduje alespoň 2 kružnice)

## Technologie

- React 19 + TypeScript
- Vite
- HTML Canvas API
- CSS
- ESLint, Prettier

## Struktura

```
src/
  App.tsx              - stav aplikace
  components/
    CircleCanvas.tsx   - canvas, kreslení, interakce
    Toolbar.tsx        - ovládací tlačítka
  utils/
    geometry.ts        - výpočet společných tečen
  types.ts             - Circle, Tangent
```
