// A latex (or tex) block renders mathematical notation through MathJax.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Derivative',
        code: `plankton -> formula: will steal
formula: |latex
  \\lim_{h \\rightarrow 0 } \\frac{f(x+h)-f(x)}{h}
|
`,
      },
      {
        label: 'tex alias',
        code: `direction: right
a -> eq: solves
eq: |tex
  x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}
|
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
