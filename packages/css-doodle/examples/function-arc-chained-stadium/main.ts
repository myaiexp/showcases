// Each arc continues the current path
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "stadium", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 22; from: 90; to: 270; at: 30 50) @arc(r: 22; from: -90; to: 90; at: 70 50) Z;
          fill: #e6437d;
        }
      );
    ` },
      { label: "tall", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 100;
        path {
          d: @arc(r: 22; from: 180; to: 360; at: 50 30) @arc(r: 22; from: 0; to: 180; at: 50 70) Z;
          fill: #ebbf4d;
        }
      );
    ` },
    ],
    say: "Two arcs and Z: a stadium",
});
