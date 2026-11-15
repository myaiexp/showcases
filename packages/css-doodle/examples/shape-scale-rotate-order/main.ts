// Scale, rotate and move run in order
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "scale, then rotate",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              scale: .9 .5;
              rotate: 30;
            );
        `,
      },
      {
        label: "rotate, then scale",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              rotate: 30;
              scale: .9 .5;
            );
        `,
      },
      {
        label: "rotate, scale, move",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              points: 300;
              rotate: 30;
              scale: .6 .3;
              move: .3 .4;
            );
        `,
      },
    ],
});
