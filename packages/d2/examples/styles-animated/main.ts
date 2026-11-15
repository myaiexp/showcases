// `animated: true` draws a connection as marching dashes; shapes animate too.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'x -> y animated',
        code: `direction: right
x -> y: hi {
  style.animated: true
}
x.style.animated: true
`,
      },
      {
        label: 'An animated chain',
        code: `direction: right
a -> b -> c: {style.animated: true}
b -> d {style.animated: true; style.stroke: tomato}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
