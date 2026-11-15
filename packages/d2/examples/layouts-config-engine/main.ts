// `layout-engine` in `vars.d2-config` selects the engine from the source
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'layout-engine: elk',
        code: `vars: {
  d2-config: {
    layout-engine: elk
  }
}

api -> auth
api -> orders
orders -> db
auth -> db
orders -> mail
`,
      },
      {
        label: 'layout-engine: dagre',
        code: `vars: {
  d2-config: {
    layout-engine: dagre
  }
}

api -> auth
api -> orders
orders -> db
auth -> db
orders -> mail
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
