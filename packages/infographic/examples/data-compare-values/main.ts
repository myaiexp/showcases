// compares entries with a label and a value, such as Plan A at 80 and Plan B at 65
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Plan A 80, Plan B 65',
    syntax: `infographic compare-binary-horizontal-badge-card-vs
theme dark
data
  title Plan Comparison
  compares
    - label Plan A
      value 80
      children
        - label Faster
          icon bolt
        - label Pricier
          icon coins
    - label Plan B
      value 65
      children
        - label Cheaper
          icon tag
        - label Slower
          icon hourglass`,
  },
  {
    say: 'Plan A 55, Plan B 90',
    syntax: `infographic compare-binary-horizontal-badge-card-vs
theme dark
data
  title Plan Comparison
  compares
    - label Plan A
      value 55
      children
        - label Faster
          icon bolt
        - label Pricier
          icon coins
    - label Plan B
      value 90
      children
        - label Cheaper
          icon tag
        - label Slower
          icon hourglass`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
    }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
