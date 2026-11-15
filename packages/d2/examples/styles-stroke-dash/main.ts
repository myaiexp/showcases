// `stroke-dash` (0 to 10) dashes an outline or connection; more is longer.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Dashed shape and connection',
        code: `direction: right
x -> y: hi {
  style: {
    stroke-dash: 3
  }
}
x.style.stroke-dash: 5
`,
      },
      {
        label: 'Dash 0, 2, 5 and 10',
        code: `direction: right
a -> b: 0 {style.stroke-dash: 0}
a -> b: 2 {style.stroke-dash: 2}
a -> b: 5 {style.stroke-dash: 5}
a -> b: 10 {style.stroke-dash: 10}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
