// Degrees, turns and radians
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "rotate: 90",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle; rotate: 90
            );
        `,
      },
      {
        label: "rotate: .25turn",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle; rotate: .25turn
            );
        `,
      },
      {
        label: "rotate: 3 * 30deg",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle; rotate: 3 * 30deg
            );
        `,
      },
    ],
});
