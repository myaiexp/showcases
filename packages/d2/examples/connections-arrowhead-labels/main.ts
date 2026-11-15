// Short labels next to a connection's ends, with a custom head.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Labels 1 and * on the two ends',
        code: `direction: right
user -> order: places {
  source-arrowhead.label: 1
  target-arrowhead: * {shape: cf-many}
}
`,
      },
      {
        label: 'Labels and heads',
        code: `direction: right
a -> b: owns {
  source-arrowhead: 1
  target-arrowhead: * {
    shape: diamond
  }
}
b <-> c: shares {
  source-arrowhead.label: 1
  target-arrowhead: * {
    shape: diamond
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
