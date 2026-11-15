// Shape keys can hold spaces, underscores, apostrophes and single hyphens.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Keys as labels',
        code: `imAShape
im_a_shape
im a shape
i'm a shape
# notice that one-hyphen is not a connection
# whereas, a--b would be a connection
a-shape
`,
      },
      {
        label: 'Two hyphens connect',
        code: `direction: right
a-b
a--b
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
