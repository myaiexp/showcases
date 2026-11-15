// values holds label and value pairs, and each chart template draws them its own way
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'chart-column-simple',
    syntax: `infographic chart-column-simple
theme dark
data
  values
    - label Visits
      value 1280
    - label Conversion Rate
      value 12.4
    - label Average Order Value
      value 256`,
  },
  {
    say: 'chart-bar-plain-text',
    syntax: `infographic chart-bar-plain-text
theme dark
data
  values
    - label Visits
      value 1280
    - label Conversion Rate
      value 12.4
    - label Average Order Value
      value 256`,
  },
  {
    say: 'chart-pie-plain-text',
    syntax: `infographic chart-pie-plain-text
theme dark
data
  values
    - label Visits
      value 1280
    - label Conversion Rate
      value 12.4
    - label Average Order Value
      value 256`,
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
