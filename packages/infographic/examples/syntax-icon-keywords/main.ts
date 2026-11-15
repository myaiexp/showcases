// An icon can be an exact id like mdi/rocket-launch or space-separated keywords
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Exact ids: mdi/rocket-launch, mdi/trophy',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  lists
    - label Launch
      desc exact id
      icon mdi/rocket-launch
    - label Win
      desc exact id
      icon mdi/trophy
    - label Grow
      desc exact id
      icon mdi/chart-line`,
  },
  {
    say: 'One-word keywords: rocket, shield, database',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  lists
    - label Launch
      desc keyword
      icon rocket
    - label Protect
      desc keyword
      icon shield
    - label Store
      desc keyword
      icon database`,
  },
  {
    say: 'Phrases, words separated by spaces: document text, star fill',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  lists
    - label Write
      desc phrase
      icon document text
    - label Rate
      desc phrase
      icon star fill
    - label Chart
      desc phrase
      icon chart line`,
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
