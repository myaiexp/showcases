// BaseData title and desc, which every data kind has, shown and left out
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'title and desc',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Product Launch
  desc Three stages from idea to shelf
  lists
    - label Idea
    - label Build
    - label Launch`,
  },
  {
    say: 'title only',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Product Launch
  lists
    - label Idea
    - label Build
    - label Launch`,
  },
  {
    say: 'neither',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Idea
    - label Build
    - label Launch`,
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
