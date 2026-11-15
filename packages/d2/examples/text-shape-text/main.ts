// shape: text turns a shape into plain text, free of Markdown styling.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Title as text',
        code: `title: A winning strategy {
  shape: text
  near: top-center
  style: {
    font-size: 55
    italic: true
  }
}

poll the people -> results
results -> unfavorable -> poll the people
results -> favorable -> will of the people
`,
      },
      {
        label: 'Same shape as a box',
        code: `title: A winning strategy
poll the people -> results
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
