// Grids connect to outside shapes normally; cells connect centre to centre.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Grid as a node',
        code: `direction: right
client -> cells
cells: {
  grid-columns: 2
  a; b; c; d
}
`,
      },
      {
        label: 'Between cells',
        code: `grid-columns: 3
a; b; c; d; e; f
a -> f
b -> d: swap
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
