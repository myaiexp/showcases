// @svg blocks are elements, declarations attributes
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "viewBox: 10", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        circle {
          cx, cy: 5;
          r: 4;
          fill: #000;
        }
      );
    ` },
      { label: "viewBox: 0 0 10 10", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle {
          cx, cy: 5;
          r: 4;
          fill: #000;
        }
      );
    ` },
      { label: "cx and cy apart", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        circle {
          cx: 5;
          cy: 5;
          r: 4;
          fill: #000;
        }
      );
    ` },
      { label: "wrapped in svg { }", code: `
      @grid: 1 / 100%;
      background: @svg(
        svg {
          viewBox: 10;
          circle { cx, cy: 5; r: 4; fill: #e6437d }
        }
      );
    ` },
    ],
    say: "Four spellings, one circle",
});
