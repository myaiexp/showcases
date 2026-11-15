// A connection takes a class inside its block or via `(a -> b)[0].class`.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'On declaration',
        code: `direction: right
classes: {
  something: {
    style.stroke: tomato
    style.stroke-dash: 4
    style.stroke-width: 3
  }
}
a -> b: {class: something}
`,
      },
      {
        label: 'Targeting afterwards',
        code: `direction: right
classes: {
  something: {
    style.stroke: tomato
    style.stroke-dash: 4
    style.stroke-width: 3
  }
}
a -> b
# ...
(a -> b)[0].class: something
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
