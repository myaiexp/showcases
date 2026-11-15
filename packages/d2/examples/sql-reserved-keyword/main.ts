// Quote a column called label (or another keyword) to keep it a column.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Quoted: a row',
        code: `my_table: {
  shape: sql_table
  "label": string
  id: int
}
`,
      },
      {
        label: 'Unquoted: the table label',
        code: `my_table: {
  shape: sql_table
  label: Orders
  id: int
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
