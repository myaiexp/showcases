// seq cycles values by point
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "seq(1, .5)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 16;
              r: seq(1, .5);
              scale: .9;
            );
        `,
      },
      {
        label: "seq(1, .6, .3)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 18;
              r: seq(1, .6, .3);
              scale: .9;
            );
        `,
      },
      {
        label: "seq(1, .4)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 10;
              r: seq(1, .4);
              scale: .9;
            );
        `,
      },
    ],
});
