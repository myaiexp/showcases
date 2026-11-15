// @arc(40 at 50 50, 0 to 180) lists the same values
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "long form", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 40; at: 50 50; from: 0; to: 180);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "short form", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(40 at 50 50, 0 to 180);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "to 90 alone", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(40 at 50 50, to 90);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "no angles", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(40 at 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
    ],
    say: "Same arc in the long form and the short one",
});
