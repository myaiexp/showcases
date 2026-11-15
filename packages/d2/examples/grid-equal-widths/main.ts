// Cells in a column share one width, so setting widths evens out the gaps.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Uneven labels',
        code: `grid-columns: 2
node: {
  grid-rows: 2
  Next Pod
  Flask Pod Service
}
other: {
  grid-rows: 2
  one
  two
}
`,
      },
      {
        label: 'Same width',
        code: `grid-columns: 2
node: {
  grid-rows: 2
  Next Pod.width: 200
  Flask Pod Service.width: 200
}
other: {
  grid-rows: 2
  one
  two
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
