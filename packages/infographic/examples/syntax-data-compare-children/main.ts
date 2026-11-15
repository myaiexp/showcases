// Each root item under compares is a target and its children are its metrics
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'compare-swot: roots with children',
    syntax: `infographic compare-swot
theme dark
data
  compares
    - label Plan A
      value 68
      children
        - label Higher conversion
        - label Higher AOV
    - label Plan B
      value 82
      children
        - label Lower conversion
        - label Average AOV`,
  },
  {
    say: 'compare-binary-horizontal-simple-fold: exactly two roots',
    syntax: `infographic compare-binary-horizontal-simple-fold
theme dark
data
  title Annual Sale
  compares
    - label Weekday
      icon calendar
      children
        - label List price 500
          icon tag
        - label Up to 10% off
          icon percent
    - label Big sale
      icon megaphone
      children
        - label You pay 450
          icon wallet
        - label Up to 20% off
          icon percent`,
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
