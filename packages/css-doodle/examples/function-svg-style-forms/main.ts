// style fill: red, style: { } and style circle { }
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "style fill: red", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle { cx, cy: 5; r: 4; style fill: #e6437d }
      );
    ` },
      { label: "style: { }", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle { cx, cy: 5; r: 4; style: { fill: #e6437d; stroke: #000; stroke-width: .5 } }
      );
    ` },
      { label: "style circle { }", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        style circle { fill: #e6437d; stroke: #000; stroke-width: .5 }
        circle { cx, cy: 5; r: 4 }
      );
    ` },
    ],
    say: "Three ways to the same inline style",
});
