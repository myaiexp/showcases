// A `tooltip.near` value pins a tooltip to a point as a permanent note.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'tooltip.near: center-left',
        code: `ci-runner
codedeploy: {
  tooltip: |md
    God has abandoned this pipeline
  |
  tooltip.near: center-left
}
aws instance

ci-runner -> codedeploy -> aws instance: safe deploy
ci-runner -> aws instance: direct deploy
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
