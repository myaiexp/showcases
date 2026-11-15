// The @shape: directive and the function
import { show } from '../../shared/d-kit.ts';

export default show({
    doodles: [
      {
        label: "@shape: heart",
        code: `
            @grid: 1 / 100%;
            background: #000;
            @shape: heart;
        `,
      },
      {
        label: "@shape(heart; scale: .5)",
        code: `
            @grid: 1 / 100%;
            background: #000;
            clip-path: @shape(
              heart; scale: .5
            );
        `,
      },
    ],
});
