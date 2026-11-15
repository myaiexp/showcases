// Declaring the shape explicitly keeps the Markdown as its label.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Plain Markdown',
        code: `explanation: |md
  # I can do headers
  - lists
  - lists

  And other normal markdown stuff
|
`,
      },
      {
        label: 'shape: rectangle',
        code: `explanation: |md
  # I can do headers
  - lists
  - lists

  And other normal markdown stuff
|
# Explicitly declare, even though the default shape is rectangle
explanation.shape: rectangle
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
