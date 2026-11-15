// When a shape and its class set one attribute, the shape's value wins.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'x.style.fill beats the class',
        code: `classes: {
  unhealthy: {
    style.fill: red
  }
}
x.class: unhealthy
x.style.fill: orange
`,
      },
      {
        label: 'Without the override',
        code: `classes: {
  unhealthy: {
    style.fill: red
  }
}
x.class: unhealthy
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
