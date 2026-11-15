// Both keywords fix the grid's size; unused cells stay empty.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '2 x 2',
        code: `grid-rows: 2
grid-columns: 2
Executive
Legislative
Judicial
`,
      },
      {
        label: '2 x 3',
        code: `grid-rows: 2
grid-columns: 3
Executive
Legislative
Judicial
Voters
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
