// Connections refer to a shape's key; a label used as a key makes new shapes.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Labels as keys (new shapes)',
        code: `be: Backend
fe: Frontend

# This would create new shapes
Backend -> Frontend
`,
      },
      {
        label: 'Keys (existing shapes)',
        code: `be: Backend
fe: Frontend

# This would define a connection over existing labels
be -> fe
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
