// Stars on hexagons
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "star: 30",
        code: `
            @grid: 120x1 / 100% / #000;
            background: @match(@tile.k == 1, #e9c46a, #2a9d8f);
            clip-path: @tile.hex(star: 30; gap: .5);
        `,
      },
      {
        label: "star: 50",
        code: `
            @grid: 120x1 / 100% / #000;
            background: @match(@tile.k == 1, #e9c46a, #2a9d8f);
            clip-path: @tile.hex(star: 50; gap: .5);
        `,
      },
      {
        label: "star: 70",
        code: `
            @grid: 120x1 / 100% / #000;
            background: @match(@tile.k == 1, #e9c46a, #2a9d8f);
            clip-path: @tile.hex(star: 70; gap: .5);
        `,
      },
    ],
});
