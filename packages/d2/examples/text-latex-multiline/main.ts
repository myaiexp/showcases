// MathJax has no line breaks, so \displaylines stacks equations.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'One line',
        code: `eq: |tex
  x = a + b \\quad y = b + c
|
`,
      },
      {
        label: 'displaylines',
        code: `eq: |tex
  \\displaylines{x = a + b \\\\ y = b + c}
|
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
