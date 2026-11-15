// Stars inside every piece
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "star: 20",
        code: `
            @grid: 150x1 / 100% / #000;
            background: @match(@tile.k == 1, #f4a261, #264653);
            clip-path: @tile.grid(star: 20; gap: .5);
        `,
      },
      {
        label: "star: 45",
        code: `
            @grid: 150x1 / 100% / #000;
            background: @match(@tile.k == 1, #f4a261, #264653);
            clip-path: @tile.grid(star: 45; gap: .5);
        `,
      },
      {
        label: "star: 67.5",
        code: `
            @grid: 150x1 / 100% / #000;
            background: @match(@tile.k == 1, #f4a261, #264653);
            clip-path: @tile.grid(star: 67.5; gap: .5);
        `,
      },
      {
        label: "star: 80",
        code: `
            @grid: 150x1 / 100% / #000;
            background: @match(@tile.k == 1, #f4a261, #264653);
            clip-path: @tile.grid(star: 80; gap: .5);
        `,
      },
    ],
});
