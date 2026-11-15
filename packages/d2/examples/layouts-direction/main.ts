// `direction` sets the flow: `down` (default), `up`, `left` or `right`.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'direction: right',
        code: `direction: right

x -> y -> z: hello
`,
      },
      {
        label: 'direction: up',
        code: `direction: up

x -> y -> z: hello
`,
      },
      {
        label: 'direction: left',
        code: `direction: left

x -> y -> z: hello
`,
      },
      {
        label: 'direction: down',
        code: `direction: down

x -> y -> z: hello
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
