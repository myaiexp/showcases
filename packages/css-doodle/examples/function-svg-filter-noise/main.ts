// @svg-filter(frequency, scale) wobbles the edge
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: ".02, 30", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(.02, 30);
    ` },
      { label: ".05, 10", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(.05, 10);
    ` },
      { label: ".01, 60", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(.01, 60);
    ` },
      { label: "named", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(frequency=.02, scale=30);
    ` },
      { label: "octave, seed", code: `
      @grid: 1 / 100%;
      @size: 80%;
      margin: auto;
      background: #000;
      border-radius: 50%;
      filter: @svg-filter(.02, 30, 3, 5);
    ` },
    ],
    say: "The arguments are frequency, scale, octave and seed",
});
