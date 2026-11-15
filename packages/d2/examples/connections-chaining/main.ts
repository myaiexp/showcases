// Several connections written on one line, sharing one label.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Mixed directions',
        code: `# The label applies to each connection in the chain.
High Mem Instance -> EC2 <- High CPU Instance: Hosted By
`,
      },
      {
        label: 'A pipeline',
        code: `direction: right
fetch -> parse -> render: next
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
