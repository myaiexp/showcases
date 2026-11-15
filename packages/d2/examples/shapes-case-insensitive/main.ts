// postgresql and postgreSQL name the same shape.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Two spellings, one shape',
        code: `direction: right
PostgreSQL
app -> postgresql: reads
`,
      },
      {
        label: 'Mixed case again',
        code: `direction: right
postgresql
postgreSQL.shape: cylinder
api -> POSTGRESQL
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
