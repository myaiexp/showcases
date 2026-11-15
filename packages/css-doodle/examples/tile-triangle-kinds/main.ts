// Triangle kinds up and down
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "circle",
        code: `
            @grid: 120x1 / 100% / #111;
            background: @match(@tile.k == 1, #264653, #e9c46a);
            clip-path: @tile.triangle(circle; gap: .5);
        `,
      },
      {
        label: "hexagon",
        code: `
            @grid: 120x1 / 100% / #111;
            background: @match(@tile.k == 1, #264653, #e9c46a);
            clip-path: @tile.triangle(hexagon; gap: .5);
        `,
      },
      {
        label: "star",
        code: `
            @grid: 120x1 / 100% / #111;
            background: @match(@tile.k == 1, #264653, #e9c46a);
            clip-path: @tile.triangle(star; gap: .5);
        `,
      },
    ],
});
