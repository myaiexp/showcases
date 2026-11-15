// `font: mono` switches a label to the monospaced font, the only value.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'font: mono',
        code: `direction: right
x -> y: hi {
  style: {
    font: mono
  }
}
x.style.font: mono
y.style.font: mono
`,
      },
      {
        label: 'font-size 8, 28 and 55',
        code: `direction: right
x -> y: hi {
  style: {
    font-size: 28
  }
}
x.style.font-size: 8
y.style.font-size: 55
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
