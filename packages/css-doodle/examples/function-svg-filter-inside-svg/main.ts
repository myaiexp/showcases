// In @svg the filter goes into that SVG's defs
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "noise", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -10 -10 20 20;
        circle { r: 7; fill: #e6437d; filter: @svg-filter(.08, 1.5) }
      );
    ` },
      { label: "blur", code: `
      @grid: 1 / 100%;
      background: @svg(
        viewBox: -10 -10 20 20;
        circle { r: 5; fill: #e6437d; filter: @svg-filter(blur: 1.2) }
      );
    ` },
    ],
    say: "circle { filter: @svg-filter(...) }",
});
