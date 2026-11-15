// Move in the minus one to one space
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: ".4 0",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle; scale: .5; move: .4 0
            );
        `,
      },
      {
        label: "-.4 0",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle; scale: .5; move: -.4 0
            );
        `,
      },
      {
        label: "0 .4",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle; scale: .5; move: 0 .4
            );
        `,
      },
      {
        label: "0 -.4",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              triangle; scale: .5; move: 0 -.4
            );
        `,
      },
    ],
});
