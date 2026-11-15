// With only rows or only columns set, cells stretch to fill the space.
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
        code: `grid-rows: 3
Executive
Legislative
Judicial
The American Government.width: 400
Voters
Non-voters
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
