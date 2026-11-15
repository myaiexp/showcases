// Holes by running the other way
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "t: t, -t",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 120;
              r: 1, .5;
              t: t, -t;
              scale: .9;
            );
        `,
      },
      {
        label: "same direction",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 120;
              r: 1, .5;
              scale: .9;
            );
        `,
      },
    ],
});
