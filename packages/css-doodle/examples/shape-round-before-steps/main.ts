// Rounding happens before the steps
import { show } from '../../shared/d-kit.ts';

export default show({
    doodles: [
      {
        label: "round, scale",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle;
              round: .4;
              scale: .6
            );
        `,
      },
      {
        label: "scale, round",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle;
              scale: .6;
              round: .4
            );
        `,
      },
    ],
});
