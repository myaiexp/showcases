// `stroke-width` (1 to 15) sets how thick outlines and connections are.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Widths 1 and 8',
        code: `direction: right
x -> y: hi {
  style: {
    stroke-width: 8
  }
}
x.style.stroke-width: 1
`,
      },
      {
        label: 'Widths 1, 4, 9 and 15',
        code: `direction: right
a -> b: 1 {style.stroke-width: 1}
a -> b: 4 {style.stroke-width: 4}
a -> b: 9 {style.stroke-width: 9}
a -> b: 15 {style.stroke-width: 15}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
