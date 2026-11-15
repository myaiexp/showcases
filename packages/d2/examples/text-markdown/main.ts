// A pipe block with the md language renders as Markdown.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Headers and lists',
        code: `explanation: |md
  # I can do headers
  - lists
  - lists

  And other normal markdown stuff
|
`,
      },
      {
        label: 'Emphasis and code',
        code: `notes: |md
  ## Inline styles
  **bold**, *italic* and \`code\`

  1. numbered
  2. items
|
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
