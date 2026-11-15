// Slices where density is larger
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "density: y",
        code: `
            @grid: 40x1 / 100% / #111;
            background: hsl(@r(190, 230) 55% @r(45, 70)%);
            clip-path: @tile.slice(density: y; gap: .5);
        `,
      },
      {
        label: "density: 1 - y",
        code: `
            @grid: 40x1 / 100% / #111;
            background: hsl(@r(190, 230) 55% @r(45, 70)%);
            clip-path: @tile.slice(density: 1 - y; gap: .5);
        `,
      },
    ],
    reroll: true,
});
