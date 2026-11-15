// to: 90deg, 1.5708rad, 100grad and .25turn match
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "deg", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 0; to: 90deg; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "rad", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 0; to: 1.5708rad; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "grad", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 0; to: 100grad; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "turn", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 0; to: .25turn; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: ".75turn", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 0; to: .75turn; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
    ],
    say: "The same quarter turn, four spellings",
});
