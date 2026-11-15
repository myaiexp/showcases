// `border-radius` (0 to 20) rounds corners; a large value makes a pill.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Radius 3 and 8',
        code: `direction: right
x -> y: hi
x.style.border-radius: 3
y.style.border-radius: 8
`,
      },
      {
        label: 'Radius 999 makes a pill',
        code: `tylenol.style.border-radius: 999
`,
      },
      {
        label: 'Rounded connection bends (ELK)',
        code: `direction: right
a -> b -> c
a -> c: {style.border-radius: 12; style.stroke-width: 3}
`,
        options: { layout: "elk" },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
