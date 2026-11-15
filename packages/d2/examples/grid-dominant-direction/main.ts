// Whichever of grid-rows and grid-columns comes first fills first.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'grid-rows first',
        code: `grid-rows: 3
grid-columns: 2
a; b; c; d; e; f
`,
      },
      {
        label: 'grid-columns first',
        code: `grid-columns: 2
grid-rows: 3
a; b; c; d; e; f
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
