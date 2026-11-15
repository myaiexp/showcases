// Frame widths
import { show } from '../../shared/d-kit.ts';

export default show({
    variants: [
      {
        label: "frame: 0.05",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              heart;
              frame: 0.05
            );
        `,
      },
      {
        label: "frame: 0.15",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              heart;
              frame: 0.15
            );
        `,
      },
      {
        label: "frame: 0.3",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              heart;
              frame: 0.3
            );
        `,
      },
    ],
});
