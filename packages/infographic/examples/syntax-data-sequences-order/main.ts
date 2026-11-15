// sequences is an ordered list, and order asc or order desc sets the direction
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'order desc: P7 first',
    syntax: `infographic sequence-stairs-front-pill-badge
theme dark
data
  title Job Level Sequence
  sequences
    - label P7
    - label P6
    - label P5
  order desc`,
  },
  {
    say: 'order asc: the same items reversed',
    syntax: `infographic sequence-stairs-front-pill-badge
theme dark
data
  title Job Level Sequence
  sequences
    - label P7
    - label P6
    - label P5
  order asc`,
  },
  {
    say: 'no order line: the default',
    syntax: `infographic sequence-stairs-front-pill-badge
theme dark
data
  title Job Level Sequence
  sequences
    - label P7
    - label P6
    - label P5`,
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
