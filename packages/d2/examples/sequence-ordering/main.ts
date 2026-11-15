// Actors appear in the order declared; declaring them first sets the columns.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Actors declared first',
        code: `shape: sequence_diagram
a; b; c; d
c -> d
d -> a
b -> d
`,
      },
      {
        label: 'Order from the connections',
        code: `shape: sequence_diagram
c -> d
d -> a
b -> d
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
