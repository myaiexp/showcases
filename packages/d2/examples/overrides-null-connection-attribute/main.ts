// Nulling deletes a connection by index and resets a style attribute.
// `(one -> two)[0]: null` deletes the connection; `one.style.stroke: null`
// drops the green stroke and leaves the pink fill.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '(one -> two)[0]: null',
        code: `one -> two

(one -> two)[0]: null
`,
      },
      {
        label: 'one.style.stroke: null',
        code: `one: {
  style: {
    fill: pink
    stroke: green
  }
}

one.style.stroke: null
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
