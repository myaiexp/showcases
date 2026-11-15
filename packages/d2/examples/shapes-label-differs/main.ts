// Assigning a value after the key sets a label that differs from the key.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Label is the key',
        code: `pg
`,
      },
      {
        label: 'pg: PostgreSQL',
        code: `pg: PostgreSQL
`,
      },
      {
        label: 'Referenced by key',
        code: `direction: right
pg: PostgreSQL
app -> pg: queries
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
