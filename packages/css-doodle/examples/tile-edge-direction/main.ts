// The edge direction e
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "upright only",
        code: `
            @grid: 40x1 / 100%;
            background: @p(#0f4c5c, #e36414, #fb8b24, #9a031e);
            clip-path: @tile.grid(edge: (e - 1) * .12 * sin(t));
        `,
      },
      {
        label: "level only",
        code: `
            @grid: 40x1 / 100%;
            background: @p(#0f4c5c, #e36414, #fb8b24, #9a031e);
            clip-path: @tile.grid(edge: (2 - e) * .12 * sin(t));
        `,
      },
    ],
});
