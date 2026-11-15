// sequences with order asc, drawn as a vertical roadmap
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'order asc',
    syntax: `infographic sequence-roadmap-vertical-simple
theme dark
data
  title Iteration Flow
  desc A simple sequence example
  sequences
    - label Requirements Review
    - label Development
    - label Integration Testing
  order asc`,
  },
  {
    say: 'order desc',
    syntax: `infographic sequence-roadmap-vertical-simple
theme dark
data
  title Iteration Flow
  desc A simple sequence example
  sequences
    - label Requirements Review
    - label Development
    - label Integration Testing
  order desc`,
  },
  {
    say: 'a fourth step, order asc',
    syntax: `infographic sequence-roadmap-vertical-simple
theme dark
data
  title Iteration Flow
  desc A simple sequence example
  sequences
    - label Requirements Review
    - label Development
    - label Integration Testing
    - label Release
  order asc`,
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
