// An array applies several classes left to right; the later one wins.
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
        label: '[d2; sphere]',
        code: `classes: {
  d2: {
    label: ""
    icon: "${icons.code}"
  }
  sphere: {
    shape: circle
    style.stroke-width: 0
  }
}

logo.class: [d2; sphere]
`,
      },
      {
        label: '[uno; dos] and [dos; uno]',
        code: `classes: {
  uno: {
    label: 1
  }
  dos: {
    label: 2
  }
}

x.class: [uno; dos]
y.class: [dos; uno]
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
