// A pattern takes backgroundColor, foregroundColor and scale
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'pattern dot, default colours',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern dot
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
  },
  {
    say: 'backgroundColor #1e3a8a, foregroundColor #93c5fd',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern dot
    backgroundColor #1e3a8a
    foregroundColor #93c5fd
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
  },
  {
    say: 'scale 2: a coarser pattern',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern dot
    scale 2
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
  },
  {
    say: 'scale 0.5: a finer pattern',
    syntax: `infographic chart-column-simple
theme dark
  stylize pattern
    pattern dot
    scale 0.5
data
  values
    - label Mon
      value 12
    - label Tue
      value 18
    - label Wed
      value 9
    - label Thu
      value 15`,
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
