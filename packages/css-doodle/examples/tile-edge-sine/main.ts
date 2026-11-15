// Bending the edges
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "edge: .15 * sin(t)",
        code: `
            @grid: 40x1 / 100% / #222;
            background: hsl(@r(360) 60% 70%);
            clip-path: @tile.grid(edge: .15 * sin(t); gap: .6);
        `,
      },
      {
        label: "edge: .1 * sin(2t)",
        code: `
            @grid: 40x1 / 100% / #222;
            background: hsl(@r(360) 60% 70%);
            clip-path: @tile.grid(edge: .1 * sin(2t); gap: .6);
        `,
      },
      {
        label: "edge: .2 * sin(t)^2",
        code: `
            @grid: 40x1 / 100% / #222;
            background: hsl(@r(360) 60% 70%);
            clip-path: @tile.grid(edge: .2 * sin(t)^2; gap: .6);
        `,
      },
    ],
    reroll: true,
});
