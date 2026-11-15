// The aspect command
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "no aspect",
        code: `
            @grid: 60x1 / 100% / #3b2410;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(gap: 1.2);
        `,
      },
      {
        label: "aspect: 16 / 9",
        code: `
            @grid: 60x1 / 100% / #3b2410;
            background: hsl(@r(34, 44) 92% @r(52, 64)%);
            clip-path: @tile.hex(gap: 1.2; aspect: 16 / 9);
        `,
      },
    ],
    frame: 'wide',
});
