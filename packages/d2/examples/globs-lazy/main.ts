// A glob applies to shapes that exist when written and to later ones.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '* -> y, then b and c',
        code: `direction: right
a

* -> y

b
c
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
