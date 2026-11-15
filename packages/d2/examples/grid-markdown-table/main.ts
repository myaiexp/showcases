// A Markdown table in a block string is easier when cells repeat.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Savings',
        code: `savings: ||md
  | Month    | Savings | Expenses | Balance |
  | -------- | ------- | -------- | ------- |
  | January  | $250    | $150     | $100    |
  | February | $80     | $200     | -$120   |
  | March    | $420    | $180     | $240    |
||
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
