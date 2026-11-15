// A shape is a rectangle until the field `shape` says otherwise.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Default rectangle',
        code: `Cloud: my cloud
`,
      },
      {
        label: 'shape: cloud',
        code: `Cloud: my cloud
Cloud.shape: cloud
`,
      },
      {
        label: 'Block form',
        code: `Cloud: my cloud {
  shape: hexagon
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
