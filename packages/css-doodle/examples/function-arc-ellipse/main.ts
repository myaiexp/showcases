// @arc(r: 40 22; ...) is an elliptical arc
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "r: 40 22", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 40 22; from: 0; to: 270; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "r: 22 40", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 22 40; from: 0; to: 270; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "full ellipse", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 40 22; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
    ],
    say: "@arc(r: 40 22; from: 0; to: 270; at: 50 50)",
});
