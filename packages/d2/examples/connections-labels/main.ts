// A value after the colon labels the connection.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Unlabelled',
        code: `Read Replica 1 -- Read Replica 2
`,
      },
      {
        label: 'Labelled',
        code: `Read Replica 1 -- Read Replica 2: Kept in sync
`,
      },
      {
        label: 'Labelled arrow',
        code: `direction: right
app -> db: SELECT
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
