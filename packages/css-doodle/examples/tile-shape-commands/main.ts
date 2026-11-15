// Shape commands change what is cut
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "r: cos(3t)",
        code: `
            @grid: 100x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.hex(r: cos(3t); gap: .6);
        `,
      },
      {
        label: "+ rotate: 30",
        code: `
            @grid: 100x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.hex(r: cos(3t); rotate: 30; gap: .6);
        `,
      },
      {
        label: "+ scale: .6 1",
        code: `
            @grid: 100x1 / 100% / #1b1b1b;
            background: oklch(.8 .1 @r(360));
            clip-path: @tile.hex(r: cos(3t); scale: .6 1; gap: .6);
        `,
      },
    ],
    reroll: true,
});
