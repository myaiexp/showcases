// width on one cell widens its row and spreads the others evenly.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Tour example',
        code: `grid-rows: 2
Executive
Legislative
Judicial
The American Government.width: 400
`,
      },
      {
        label: 'Tall cell',
        code: `grid-columns: 2
a
b
c
d
a.height: 200
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
