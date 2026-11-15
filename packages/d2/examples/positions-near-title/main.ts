// A shape with `near: top-center` is pinned to that point, outside layout.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'near: top-center',
        code: `title: |md
  # A winning strategy
| {near: top-center}

poll the people -> results
results -> unfavorable -> poll the people
results -> favorable -> will of the people
`,
      },
      {
        label: 'near: bottom-right',
        code: `title: |md
  # A winning strategy
| {near: bottom-right}

poll the people -> results
results -> unfavorable -> poll the people
results -> favorable -> will of the people
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
