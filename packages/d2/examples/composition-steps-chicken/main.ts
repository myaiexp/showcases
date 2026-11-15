// Steps: each step inherits the one before it and builds the diagram up
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const source = `Chicken's plan: {
  style.font-size: 35
  near: top-center
  shape: text
}

steps: {
  1: {
    Approach road
  }
  2: {
    Approach road -> Cross road
  }
  3: {
    Cross road -> Make you wonder why
  }
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'All steps, animated at 1200 ms each', code: source, options: { target: '*', animateInterval: 1200 } },
      { label: 'Step 1', code: source, options: { target: 'steps.1' } },
      { label: 'Step 2: Approach road is inherited from step 1', code: source, options: { target: 'steps.2' } },
      { label: 'Step 3: both earlier steps are inherited', code: source, options: { target: 'steps.3' } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
