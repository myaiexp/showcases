// @arc(...) M @arc(...) draws two pieces
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "brackets", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 36; from: 120; to: 240; at: 50 50) M @arc(r: 36; from: -60; to: 60; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
      { label: "concentric", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 38; from: 0; to: 250; at: 50 50) M @arc(r: 24; from: 180; to: 360; at: 50 50) M @arc(r: 10; at: 50 50);
          fill: none;
          stroke: #000;
          stroke-width: 6;
          stroke-linecap: round;
        }
      );
    ` },
    ],
    say: "@arc(…) M @arc(…): one path, two pieces",
});
