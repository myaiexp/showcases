// grid-rows: 3 sets three rows; shapes fill them.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '3 rows',
        code: `grid-rows: 3
Executive
Legislative
Judicial
`,
      },
      {
        label: '2 rows',
        code: `grid-rows: 2
Executive
Legislative
Judicial
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
