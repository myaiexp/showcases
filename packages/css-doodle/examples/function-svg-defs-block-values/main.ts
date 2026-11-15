// pattern, clipPath, mask and marker blocks in values
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "pattern", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        rect {
          width, height: 10;
          fill: pattern {
            width: 2;
            height: 2;
            patternUnits: userSpaceOnUse;
            circle { cx, cy: 1; r: .6; fill: #e6437d }
          }
        }
      );
    ` },
      { label: "clipPath", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        rect {
          width, height: 10;
          fill: #000;
          clip-path: clipPath {
            circle { cx, cy: 5; r: 4 }
          }
        }
      );
    ` },
      { label: "mask", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        rect {
          width, height: 10;
          fill: #e6437d;
          mask: mask {
            circle { cx, cy: 5; r: 4; fill: #fff }
            circle { cx, cy: 5; r: 2; fill: #000 }
          }
        }
      );
    ` },
      { label: "marker", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        path {
          d: M 1 8 L 9 2;
          stroke: #000;
          stroke-width: .3;
          marker-end: marker {
            viewBox: 0 0 10 10;
            refX: 5;
            refY: 5;
            markerWidth: 4;
            markerHeight: 4;
            orient: auto;
            path { d: M 0 0 L 10 5 L 0 10 z; fill: #e6437d }
          }
        }
      );
    ` },
    ],
    say: "The attribute becomes url(#id)",
});
