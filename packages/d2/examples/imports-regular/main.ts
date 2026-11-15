// Regular import: `a: @x` gives the whole of x.d2 to a as its value
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const files = {
  'x.d2': `x: {
  shape: circle
}`,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'a: @x.d2', files, code: 'a: @x.d2\na -> b' },
      { label: 'a: @x (the extension left off, as the formatter writes it)', files, code: 'a: @x\na -> b' },
      { label: 'The same file imported into two shapes', files, code: 'a: @x\nb: @x\na -> b' },
    ],
  });
  return () => stage.dispose();
};

export default mount;
