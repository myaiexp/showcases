// data.items with label, desc and icon, growing one field at a time
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'items with a label each',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Infographic Title
  desc This is the description text of the infographic
  items
    - label Data Item 1
    - label Data Item 2`,
  },
  {
    say: '+ desc on each item',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Infographic Title
  desc This is the description text of the infographic
  items
    - label Data Item 1
      desc This is the description of data item 1
    - label Data Item 2
      desc This is the description of data item 2`,
  },
  {
    say: '+ icon on each item',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Infographic Title
  desc This is the description text of the infographic
  items
    - icon star
      label Data Item 1
      desc This is the description of data item 1
    - icon heart
      label Data Item 2
      desc This is the description of data item 2`,
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
