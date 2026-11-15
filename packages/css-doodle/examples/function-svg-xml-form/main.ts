// A body starting with < is used as written
import { show } from '../../shared/c-kit.ts';

export default show({
    doodles: [
      { label: "CSS-like", code: `
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
      { label: "XML", code: `
      @grid: 1 / 100%;
      background: @svg(
        <svg viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="4" fill="#000"/>
        </svg>
      );
    ` },
    ],
    say: "Same picture, two syntaxes",
});
