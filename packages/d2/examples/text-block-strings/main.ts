// When code contains pipes, widen the delimiter: ||, |||, or a symbol.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Double pipe',
        code: `my_code: ||ts
  declare function getSmallPet(): Fish | Bird;
||
`,
      },
      {
        label: 'Triple pipe',
        code: `my_code: |||ts
  declare function getSmallPet(): Fish | Bird;
  const works = (a > 1) || (b < 2)
|||
`,
      },
      {
        label: 'Backtick delimiter',
        code: `# Much cleaner!
my_code: |\`ts
  declare function getSmallPet(): Fish | Bird;
  const works = (a > 1) || (b < 2)
\`|
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
