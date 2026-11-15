// font-size is ignored in LaTeX; \tiny to \huge set size in-formula.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'tiny and small',
        code: `grid-columns: 2
a: |tex
  \\tiny{E = mc^2}
|
b: |tex
  \\small{E = mc^2}
|
`,
      },
      {
        label: 'normal, large, huge',
        code: `grid-columns: 3
a: |tex
  \\normal{E = mc^2}
|
b: |tex
  \\large{E = mc^2}
|
c: |tex
  \\huge{E = mc^2}
|
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
