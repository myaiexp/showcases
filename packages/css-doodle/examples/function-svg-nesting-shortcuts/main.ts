// g circle, g > circle and circle, rect share attributes
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "nested", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        g { fill: #e6437d; circle { cx, cy: 5; r: 4 } }
      );
    ` },
      { label: "g circle", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        g { fill: #e6437d }
        g circle { cx, cy: 5; r: 4 }
      );
    ` },
      { label: "g > circle", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        g { fill: #e6437d }
        g > circle { cx, cy: 5; r: 4 }
      );
    ` },
      { label: "circle, rect", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle, rect { fill: #000 }
        circle { cx, cy: 3; r: 2 }
        rect { x: 5; y: 5; width, height: 4 }
      );
    ` },
    ],
    say: "Several spellings of the same SVG",
});
