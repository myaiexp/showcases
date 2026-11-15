// compares entries whose children carry a value, drawn by a value-showing item
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Plan A: 80, Plan B: 65',
    syntax: `infographic compare-binary-horizontal-compact-card-vs
theme dark
data
  title Plan Comparison
  compares
    - label Plan A
      children
        - label Speed
          value 80
          icon bolt
        - label Price
          value 65
          icon coins
    - label Plan B
      children
        - label Speed
          value 65
          icon bolt
        - label Price
          value 80
          icon coins`,
  },
  {
    say: 'Plan A: 35, Plan B: 90',
    syntax: `infographic compare-binary-horizontal-compact-card-vs
theme dark
data
  title Plan Comparison
  compares
    - label Plan A
      children
        - label Speed
          value 35
          icon bolt
        - label Price
          value 90
          icon coins
    - label Plan B
      children
        - label Speed
          value 90
          icon bolt
        - label Price
          value 35
          icon coins`,
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
