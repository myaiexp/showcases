// rect#a.b, same-id blocks merge, style { } inside
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "class + style", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        style { .dot { fill: #e6437d } .big { r: 3 } }
        circle.dot.big { cx: 3; cy: 5 }
        circle.dot { cx: 7; cy: 5; r: 1.5 }
      );
    ` },
      { label: "merged blocks", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        circle#a { cx, cy: 5; r: 4 }
        circle#a { fill: #ebbf4d; stroke: #000; stroke-width: .4 }
      );
    ` },
    ],
    say: "circle#a twice is one circle",
});
