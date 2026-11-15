// @arc(r; from; to; at) as the d of a path
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "to 180", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 0; to: 180; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "to 90", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 0; to: 90; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "from 90 to 270", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 90; to: 270; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "to 300", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 0; to: 300; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
    ],
    say: "@arc(r: 36; from: 0; to: 180; at: 50 50)",
});
