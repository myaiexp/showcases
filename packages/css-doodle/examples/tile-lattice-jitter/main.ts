// Jitter moves the corners
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "jitter: 0",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(jitter: 0; gap: .6);
        `,
      },
      {
        label: "jitter: 0.15",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(jitter: 0.15; gap: .6);
        `,
      },
      {
        label: "jitter: 0.3",
        code: `
            @grid: 60x1 / 100% / #1b1b1b;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(jitter: 0.3; gap: .6);
        `,
      },
    ],
    reroll: true,
});
