// A stop is a color, an offset and an opacity: red 30% .5
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "colors only", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: #222 }
        circle { cx, cy: 5; r: 4; fill: @radialGradient(#e6437d, #ebbf4d, #000) }
      );
    ` },
      { label: "with offsets", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: #222 }
        circle { cx, cy: 5; r: 4; fill: @radialGradient(#e6437d 20%, #ebbf4d 40%, #000 90%) }
      );
    ` },
      { label: "with opacity", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: #222 }
        circle { cx, cy: 5; r: 4; fill: @radialGradient(#e6437d, #e6437d 50% .5, #e6437d 100% 0) }
      );
    ` },
    ],
    say: "Offsets and opacities are read from the stop",
});
