// Setting a key to `null` deletes it.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'one: null',
        code: `one
two

one: null
`,
      },
      {
        label: 'two: null removes one -> two',
        code: `one -> two

two: null
`,
      },
      {
        label: 'one.two: null removes three too',
        code: `one: {
  two: {
    three
  }
}

one.two: null
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
