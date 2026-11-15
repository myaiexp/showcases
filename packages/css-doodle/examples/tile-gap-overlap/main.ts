// Gap, zero and overlap
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "gap: -0.3",
        code: `
            @grid: 40x1 / 100% / #111;
            background: @p(#f2efe6, #d7301f, #1f4e9c, #f5c400);
            clip-path: @tile.hex(gap: -0.3);
        `,
      },
      {
        label: "gap: 0",
        code: `
            @grid: 40x1 / 100% / #111;
            background: @p(#f2efe6, #d7301f, #1f4e9c, #f5c400);
            clip-path: @tile.hex(gap: 0);
        `,
      },
      {
        label: "gap: 1",
        code: `
            @grid: 40x1 / 100% / #111;
            background: @p(#f2efe6, #d7301f, #1f4e9c, #f5c400);
            clip-path: @tile.hex(gap: 1);
        `,
      },
      {
        label: "gap: 3",
        code: `
            @grid: 40x1 / 100% / #111;
            background: @p(#f2efe6, #d7301f, #1f4e9c, #f5c400);
            clip-path: @tile.hex(gap: 3);
        `,
      },
    ],
});
