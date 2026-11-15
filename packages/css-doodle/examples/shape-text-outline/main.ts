// Outline of a letter
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "frame: .12",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: R;
              font: 900 serif;
              frame: .12;
              scale: .9;
            );
        `,
      },
      {
        label: "mirror: x",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: R;
              font: 900 serif;
              scale: .5 .9;
              move: .5 0;
              mirror: x;
            );
        `,
      },
      {
        label: "rotate: 20",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              text: R;
              font: 900 serif;
              rotate: 20;
              scale: .8;
            );
        `,
      },
    ],
});
