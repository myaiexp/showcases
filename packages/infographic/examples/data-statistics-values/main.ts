// values entries with a label and a number, here the traffic sources split
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Search 62, Direct 38',
    syntax: `infographic chart-pie-donut-plain-text
theme dark
data
  title Traffic Sources
  values
    - label Search
      value 62
    - label Direct
      value 38`,
  },
  {
    say: 'Search 45, Direct 55',
    syntax: `infographic chart-pie-donut-plain-text
theme dark
data
  title Traffic Sources
  values
    - label Search
      value 45
    - label Direct
      value 55`,
  },
  {
    say: 'A third source: Social 20',
    syntax: `infographic chart-pie-donut-plain-text
theme dark
data
  title Traffic Sources
  values
    - label Search
      value 45
    - label Direct
      value 35
    - label Social
      value 20`,
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
