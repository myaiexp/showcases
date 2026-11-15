// fill: linearGradient { ... } builds defs for you
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "linearGradient", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        rect {
          width, height: 10;
          fill: linearGradient {
            gradientTransform: rotate(45);
            stop { offset: 0; stop-color: #000 }
            stop { offset: 1; stop-color: #e6437d }
          }
        }
      );
    ` },
      { label: "radialGradient", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        rect {
          width, height: 10;
          fill: radialGradient {
            stop { offset: 0; stop-color: #ebbf4d }
            stop { offset: 1; stop-color: #000 }
          }
        }
      );
    ` },
      { label: "defs prefix", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 0 0 10 10;
        rect {
          width, height: 10;
          fill: defs linearGradient {
            gradientTransform: rotate(90);
            stop { offset: 0; stop-color: #ebbf4d }
            stop { offset: 1; stop-color: #e6437d }
          }
        }
      );
    ` },
    ],
    say: "No <defs> and no id to write",
});
