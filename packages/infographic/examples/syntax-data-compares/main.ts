// compares holds the items to set side by side, here the four quadrants
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Four compares items, one per quadrant',
    syntax: `infographic compare-quadrant-quarter-simple-card
theme dark
data
  compares
    - label High Value, High Growth
      icon star
    - label High Value, Low Growth
      icon diamond
    - label Low Value, High Growth
      icon rocket
    - label Low Value, Low Growth
      icon down`,
  },
  {
    say: 'A task-priority reading of the same four slots',
    syntax: `infographic compare-quadrant-quarter-simple-card
theme dark
data
  compares
    - label Do now
      icon bolt
    - label Plan it
      icon calendar
    - label Hand off
      icon share
    - label Drop it
      icon trash`,
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
