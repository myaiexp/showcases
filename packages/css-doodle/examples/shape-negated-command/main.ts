// A minus before a command name
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "rotate: 30",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              star 5 .4; rotate: 30; scale: .9
            );
        `,
      },
      {
        label: "-rotate: 30",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              star 5 .4; -rotate: 30; scale: .9
            );
        `,
      },
      {
        label: "-move: .3 .3",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              star 5 .4; scale: .5; -move: .3 .3
            );
        `,
      },
    ],
});
