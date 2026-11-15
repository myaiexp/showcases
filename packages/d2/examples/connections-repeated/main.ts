// Declaring the same connection again adds another one.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Three connections',
        code: `Database -> S3: backup
Database -> S3
Database -> S3: backup
`,
      },
      {
        label: 'One connection',
        code: `Database -> S3: backup
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
