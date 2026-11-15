// `width` and `height` (pixels) fix the size of most shapes.
import type { Mount } from '@/types.ts';
import { icons } from '../../shared/icons.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Three sizes of one image',
        code: `direction: right

small: "" {
  shape: image
  icon: "${icons.user}"
  width: 100
  height: 100
}

med: "" {
  shape: image
  icon: "${icons.user}"
  width: 160
  height: 160
}

big: "" {
  shape: image
  icon: "${icons.user}"
  width: 220
  height: 180
}

big -> med -> small
`,
      },
      {
        label: 'Plain rectangles',
        code: `direction: right
a: {width: 60; height: 40}
b: {width: 120; height: 80}
c: {width: 200; height: 120}
a -> b -> c
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
