// The tour's shape example: labelled and shaped database nodes.
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
        code: `pg: PostgreSQL
Cloud: my cloud
Cloud.shape: cloud
SQLite
Cassandra
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
