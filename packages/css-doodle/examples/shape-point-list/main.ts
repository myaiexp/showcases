// Corners as x y pairs
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "Triangle",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 0 1, 1 -1, -1 -1
            );
        `,
      },
      {
        label: "Arrow",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 0 1, 1 0, .4 0, .4 -1, -.4 -1, -.4 0, -1 0
            );
        `,
      },
      {
        label: "Kite",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 0 1, .6 .1, 0 -1, -.6 .1
            );
        `,
      },
    ],
});
