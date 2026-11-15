// A `tooltip` field attaches secondary text to a shape.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover over x or y. Tooltips are SVG title elements, so the browser draws them, as plain text.' });
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Tooltips on x and y',
        code: `x: {tooltip: Total abstinence is easier than perfect moderation}
y: {tooltip: Gee, I feel kind of LIGHT in the head now,\\nknowing I can't make my satellite dish PAYMENTS!}
x -> y
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
