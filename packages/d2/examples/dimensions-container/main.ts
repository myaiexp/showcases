// On containers, `width` and `height` work with ELK but not with dagre.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'ELK',
        code: `box: {
  width: 260
  height: 120
  a
  b
}
box -> out
`,
        options: { layout: "elk" },
      },
      {
        label: 'dagre',
        code: `box: {
  width: 260
  height: 120
  a
  b
}
box -> out
`,
        options: { layout: "dagre" },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
