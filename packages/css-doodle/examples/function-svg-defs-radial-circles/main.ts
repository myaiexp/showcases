// Four circles each with a defs radialGradient fill
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "one stop", code: `
      @grid: 1 / 100%;
      background: #333 @svg(
        viewBox: 0 0 16 16;
        circle*4 {
          cx: @n(*3.5); cy: 8; r: 2;
          fill: defs radialGradient { stop { offset: 0; stop-color: red; } };
        }
      );
    ` },
      { label: "two stops", code: `
      @grid: 1 / 100%;
      background: #333 @svg(
        viewBox: 0 0 16 16;
        circle*4 {
          cx: @n(*3.5); cy: 8; r: 2;
          fill: defs radialGradient {
            stop { offset: 0; stop-color: #ebbf4d; }
            stop { offset: 1; stop-color: #e6437d; }
          };
        }
      );
    ` },
    ],
    say: "fill: defs radialGradient { stop { … } }",
});
