// 45deg, .25turn and a bare number rotate a gradient
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "45deg", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: @linearGradient(45deg, #000, #e6437d, #ebbf4d) }
      );
    ` },
      { label: "45", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: @linearGradient(45, #000, #e6437d, #ebbf4d) }
      );
    ` },
      { label: ".25turn", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: @linearGradient(.25turn, #000, #e6437d, #ebbf4d) }
      );
    ` },
      { label: "0", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: 10;
        rect { width, height: 10; fill: @linearGradient(0, #000, #e6437d, #ebbf4d) }
      );
    ` },
    ],
    say: "The angle comes first, before the stops",
});
