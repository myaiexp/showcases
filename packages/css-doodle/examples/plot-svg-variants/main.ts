// The @Plot variants in SVG
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "@Plot.scatter",
        code: `
            @grid: 1 / 100% / #f4f1ea;
            background: @svg(
              viewBox: -1 -1 2 2;
              circle*90 {
                cx, cy: @Plot.scatter(star; scale: .9);
                r: .05;
              }
            );
        `,
      },
      {
        label: "@Plot.hex",
        code: `
            @grid: 1 / 100% / #f4f1ea;
            background: @svg(
              viewBox: -1 -1 2 2;
              circle*90 {
                cx, cy: @Plot.hex(star; scale: .9);
                r: .05;
              }
            );
        `,
      },
      {
        label: "@Plot.grid",
        code: `
            @grid: 1 / 100% / #f4f1ea;
            background: @svg(
              viewBox: -1 -1 2 2;
              circle*90 {
                cx, cy: @Plot.grid(star; scale: .9);
                r: .05;
              }
            );
        `,
      },
      {
        label: "@Plot.penrose",
        code: `
            @grid: 1 / 100% / #f4f1ea;
            background: @svg(
              viewBox: -1 -1 2 2;
              circle*200 {
                cx, cy: @Plot.penrose(star; scale: .9);
                r: .05;
              }
            );
        `,
      },
    ],
});
