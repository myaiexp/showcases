// @arc(...) L 0 0 Z is a pie slice
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "-40 to 40", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -50 -50 100 100;
        path {
          d: @arc(r: 40; from: -40; to: 40) L 0 0 Z;
          fill: #000;
        }
      );
    ` },
      { label: "-90 to 90", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -50 -50 100 100;
        path {
          d: @arc(r: 40; from: -90; to: 90) L 0 0 Z;
          fill: #e6437d;
        }
      );
    ` },
      { label: "30 to 330", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -50 -50 100 100;
        path {
          d: @arc(r: 40; from: 30; to: 330) L 0 0 Z;
          fill: #ebbf4d;
        }
      );
    ` },
    ],
    say: "d: @arc(r: 40; from: -40; to: 40) L 0 0 Z",
});
