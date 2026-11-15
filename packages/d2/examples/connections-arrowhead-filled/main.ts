// style.filled flips an arrowhead between solid and outlined.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Triangle',
        code: `direction: right
a -> b: {target-arrowhead.shape: triangle}
c -> d: {
  target-arrowhead: {
    shape: triangle
    style.filled: false
  }
}
`,
      },
      {
        label: 'Diamond',
        code: `direction: right
a -> b: {target-arrowhead.shape: diamond}
c -> d: {
  target-arrowhead: {
    shape: diamond
    style.filled: true
  }
}
`,
      },
      {
        label: 'Circle and box',
        code: `direction: right
a -> b: {
  target-arrowhead: {
    shape: circle
    style.filled: true
  }
}
c -> d: {
  target-arrowhead: {
    shape: box
    style.filled: true
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
