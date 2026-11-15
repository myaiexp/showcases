// A connection back to an earlier shape closes a loop.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Chain',
        code: `direction: right
Stage One -> Stage Two -> Stage Three -> Stage Four
`,
      },
      {
        label: 'Closed by a cycle',
        code: `direction: right
Stage One -> Stage Two -> Stage Three -> Stage Four
Stage Four -> Stage One: repeat
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
