// Commands added to a preset
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "heart; frame: .1",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              heart; frame: .1
            );
        `,
      },
      {
        label: "square; scale: .5",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              square; scale: .5
            );
        `,
      },
      {
        label: "star; rotate: 36",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              star; rotate: 36
            );
        `,
      },
    ],
    say: "The preset comes first, then your commands",
});
