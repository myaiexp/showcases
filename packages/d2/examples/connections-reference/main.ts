// (x -> y)[n] addresses the nth connection between two shapes.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Styled by index',
        code: `direction: right
x -> y: hi
x -> y: hello

(x -> y)[0].style.stroke: red
(x -> y)[1].style.stroke: blue
`,
      },
      {
        label: 'Three connections',
        code: `direction: right
x -> y: one
x -> y: two
x -> y: three

(x -> y)[0].style.stroke: orange
(x -> y)[2].style.stroke-dash: 4
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
