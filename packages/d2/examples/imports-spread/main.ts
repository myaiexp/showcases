// Spread import: `...@x` inside a map inserts the file's contents into that map
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
      { label: 'a: { ...@x } inserts x.d2 into a', files, code: 'a: {\n  ...@x\n}\na -> b' },
      { label: 'Spread at the root: x becomes a top-level shape', files, code: '...@x\nx -> b' },
      {
        label: 'a: ...@x is not allowed: spreads only work inside maps',
        files,
        code: '# (deliberate error)\na: ...@x\na -> b',
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
