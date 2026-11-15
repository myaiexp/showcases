// A semicolon lets one line declare more than one shape.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'SQLite; Cassandra',
        code: `SQLite; Cassandra
`,
      },
      {
        label: 'One per line',
        code: `SQLite
Cassandra
`,
      },
      {
        label: 'Semicolons with connections',
        code: `direction: right
a -> b; c -> d
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
