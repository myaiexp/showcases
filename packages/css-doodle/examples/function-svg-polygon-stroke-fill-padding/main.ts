// stroke, stroke-width, fill and padding of a shape
import { show } from '../../shared/c-kit.ts';

export default show({
    variants: [
      { label: "defaults", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(star);
    ` },
      { label: "stroke, fill", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(star; stroke: #000; stroke-width: .06; fill: #ebbf4d);
    ` },
      { label: "thick, padding: 0", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(star; stroke-width: .3; padding: 0);
    ` },
      { label: "thick, padding: .3", code: `
      @grid: 1 / 100%;
      background: @svg-polygon(star; stroke-width: .3; padding: .3);
    ` },
    ],
    say: "The reference table, one property at a time",
});
