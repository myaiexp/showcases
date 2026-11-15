// Setting stroke and stroke-dash on an actor restyles its lifeline.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Default lifelines',
        code: `shape: sequence_diagram
alice -> bob: What does it mean\\nto be well-adjusted?
bob -> alice: The ability to play bridge or\\ngolf as if they were games.
`,
      },
      {
        label: 'alice in red, solid',
        code: `shape: sequence_diagram
alice -> bob: What does it mean\\nto be well-adjusted?
bob -> alice: The ability to play bridge or\\ngolf as if they were games.

alice.style: {
  stroke: red
  stroke-dash: 0
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
