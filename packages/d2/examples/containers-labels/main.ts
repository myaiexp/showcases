// Two ways to label a container: shorthand and the label keyword.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Shorthand',
        code: `gcloud: Google Cloud {
  auth -> db
}
`,
      },
      {
        label: 'label keyword',
        code: `gcloud: {
  label: Google Cloud
  auth -> db
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
