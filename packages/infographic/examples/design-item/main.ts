// design.item swaps the card design of every data item on one structure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'item simple',
    syntax: `infographic
design
  structure list-row
  item simple
  title default
theme dark
data
  title One structure, four items
  lists
    - label Plan
      desc Decide
      icon clipboard
    - label Build
      desc Make
      icon hammer
    - label Ship
      desc Release
      icon rocket`,
  },
  {
    say: 'item horizontal-icon-arrow',
    syntax: `infographic
design
  structure list-row
  item horizontal-icon-arrow
  title default
theme dark
data
  title One structure, four items
  lists
    - label Plan
      desc Decide
      icon clipboard
    - label Build
      desc Make
      icon hammer
    - label Ship
      desc Release
      icon rocket`,
  },
  {
    say: 'item compact-card',
    syntax: `infographic
design
  structure list-row
  item compact-card
  title default
theme dark
data
  title One structure, four items
  lists
    - label Plan
      desc Decide
      icon clipboard
    - label Build
      desc Make
      icon hammer
    - label Ship
      desc Release
      icon rocket`,
  },
  {
    say: 'item badge-card',
    syntax: `infographic
design
  structure list-row
  item badge-card
  title default
theme dark
data
  title One structure, four items
  lists
    - label Plan
      desc Decide
      icon clipboard
    - label Build
      desc Make
      icon hammer
    - label Ship
      desc Release
      icon rocket`,
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
