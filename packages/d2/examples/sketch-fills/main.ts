// Sketch mode lays a streak texture over each fill, not RoughJS hatching.
// Its blend is chosen from the fill's brightness, so dark and light stay readable.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Fills from dark to light',
        code: `direction: right
a: dark {style.fill: "#1b263b"; style.font-color: white}
b: blue {style.fill: "#3a86ff"}
c: sand {style.fill: "#f4d58d"}
d: pale {style.fill: "#f5f5f5"}
a -> b -> c -> d
`,
        options: { sketch: true },
      },
      {
        label: 'Normal rendering',
        code: `direction: right
a: dark {style.fill: "#1b263b"; style.font-color: white}
b: blue {style.fill: "#3a86ff"}
c: sand {style.fill: "#f4d58d"}
d: pale {style.fill: "#f5f5f5"}
a -> b -> c -> d
`,
        options: { sketch: false },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
