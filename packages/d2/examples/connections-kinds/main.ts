// Hyphens and arrows between shapes define a connection: --, ->, <- and <->.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Tour examples',
        code: `direction: right
Write Replica Canada <-> Write Replica Australia

Read Replica <- Master
Write Replica -> Master

Read Replica 1 -- Read Replica 2
`,
      },
      {
        label: 'One of each',
        code: `direction: right
a -- b
c -> d
e <- f
g <-> h
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
