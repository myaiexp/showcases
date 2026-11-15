// The `opacity` style is a number from 0 to 1 that fades a shape or connection.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'opacity 0, 0.7 and 0.4',
        code: `direction: right
x -> y: hi {
  style: {
    opacity: 0.4
  }
}
x.style.opacity: 0
y.style.opacity: 0.7
`,
      },
      {
        label: 'A container at 0.4',
        code: `direction: right
group: {
  a -> b
  style.opacity: 0.4
}
group -> c
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
