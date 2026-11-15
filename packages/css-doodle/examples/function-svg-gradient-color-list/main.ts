// One comma-list argument is split into stops
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "pink, yellow", code: `
      @grid: 1 / 100%;
      --colors: #000, #e6437d, #ebbf4d;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: @linearGradient(90deg, $colors) }
        circle { cx, cy: 5; r: 3; fill: @radialGradient($colors) }
      );
    ` },
      { label: "blues", code: `
      @grid: 1 / 100%;
      --colors: #031a40, #3b82f6, #bfdbfe, #fff;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: @linearGradient(90deg, $colors) }
        circle { cx, cy: 5; r: 3; fill: @radialGradient($colors) }
      );
    ` },
      { label: "two colors", code: `
      @grid: 1 / 100%;
      --colors: #ebbf4d, #e6437d;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: @linearGradient(90deg, $colors) }
        circle { cx, cy: 5; r: 3; fill: @radialGradient($colors) }
      );
    ` },
    ],
    say: "@linearGradient($colors)",
});
