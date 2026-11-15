// `**` reaches into every nested level.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '**.style.border-radius',
        code: `a: {
  b: {
    c
  }
}

**.style.border-radius: 7
`,
      },
      {
        label: 'zone-A.** -> load balancer',
        code: `zone-A: {
  machine A
  machine B: {
    submachine A
    submachine B
  }
}

zone-A.** -> load balancer
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
