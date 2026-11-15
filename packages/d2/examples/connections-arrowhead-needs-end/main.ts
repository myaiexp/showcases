// An arrowhead on an end that has no arrow draws nothing.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Source head on ->: nothing',
        code: `direction: right
x -> y: {
  source-arrowhead.shape: diamond
}
`,
      },
      {
        label: 'Source head on <->: drawn',
        code: `direction: right
x <-> y: {
  source-arrowhead.shape: diamond
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
