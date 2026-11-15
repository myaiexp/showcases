// The `layout` option picks dagre (curved routes) or ELK (orthogonal routes)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'layout: dagre',
        code: `api -> auth
api -> orders
orders -> db
auth -> db
orders -> mail
`,
        options: { layout: "dagre" },
      },
      {
        label: 'layout: elk',
        code: `api -> auth
api -> orders
orders -> db
auth -> db
orders -> mail
`,
        options: { layout: "elk" },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
