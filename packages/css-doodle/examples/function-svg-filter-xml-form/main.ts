// @svg-filter(<filter>...</filter>) is used as written
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "feGaussianBlur", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(<filter><feGaussianBlur stdDeviation="6"/></filter>);
    ` },
      { label: "turbulence", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(<filter><feTurbulence type="fractalNoise" baseFrequency=".02"/><feDisplacementMap in="SourceGraphic" scale="30"/></filter>);
    ` },
    ],
    say: "The XML is returned as url() to a filter",
});
