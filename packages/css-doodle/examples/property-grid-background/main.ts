// the second / sets the component background: colour, gradient or SVG
import { simple } from '../../shared/a-kit.ts';

export default simple({
  variants: [
    { label: "colour", code: `
      @grid: 4 / 100% / #e6437d _4px;
      background: #fff;
    ` },
    { label: "gradient", code: `
      @grid: 4 / 100% / linear-gradient(#96c, #f9c) _4px;
      background: #fff4;
    ` },
    { label: "@svg", code: `
      @grid: 1 / 100% / @svg(
        viewBox: -5 -5 10 10;
        circle { r: 3; fill: #e6437d }
      );
    ` },
  ],
});
