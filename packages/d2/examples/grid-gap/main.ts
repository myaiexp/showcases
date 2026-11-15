// grid-gap, vertical-gap and horizontal-gap set the space between cells.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'grid-gap: 0',
        code: `grid-columns: 3
grid-gap: 0
a; b; c; d; e; f
`,
      },
      {
        label: 'grid-gap: 40',
        code: `grid-columns: 3
grid-gap: 40
a; b; c; d; e; f
`,
      },
      {
        label: 'Per axis',
        code: `grid-columns: 3
grid-gap: 10
vertical-gap: 50
a; b; c; d; e; f
`,
      },
      {
        label: 'horizontal-gap: 60',
        code: `grid-columns: 3
grid-gap: 10
horizontal-gap: 60
a; b; c; d; e; f
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
