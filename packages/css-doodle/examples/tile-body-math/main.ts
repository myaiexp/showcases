// Math in the body
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "k: 0.05",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(k: 0.05; jitter: 2k; gap: .6);
        `,
      },
      {
        label: "k: 0.1",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(k: 0.1; jitter: 2k; gap: .6);
        `,
      },
      {
        label: "k: 0.15",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(k: 0.15; jitter: 2k; gap: .6);
        `,
      },
    ],
    reroll: true,
});
