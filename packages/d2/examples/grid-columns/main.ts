// grid-columns: 3 sets three columns; extra shapes wrap to new rows.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '3 columns',
        code: `grid-columns: 3
Executive
Legislative
Judicial
`,
      },
      {
        label: '2 columns',
        code: `grid-columns: 2
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
