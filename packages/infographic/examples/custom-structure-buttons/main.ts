// A showcase-stack structure placing BtnAdd and BtnRemove buttons
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerStructure } from '@antv/infographic';
import { Stack } from './stack.tsx';

registerStructure('showcase-stack', { component: Stack, composites: ['title', 'item'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'three items',
    syntax: `infographic
design
  structure showcase-stack
    gap 24
  title default
  item simple
    width 220
theme dark
data
  title Stack
  lists
    - label Plan
      desc Scope the work
      icon lightbulb
    - label Build
      desc Make the thing
      icon gear
    - label Test
      desc Break it early
      icon shield-halved`,
  },
  {
    say: 'four items',
    syntax: `infographic
design
  structure showcase-stack
    gap 24
  title default
  item simple
    width 220
theme dark
data
  title Stack
  lists
    - label Plan
      desc Scope the work
      icon lightbulb
    - label Build
      desc Make the thing
      icon gear
    - label Test
      desc Break it early
      icon shield-halved
    - label Ship
      desc Send it out
      icon rocket`,
  },
  {
    say: 'two items',
    syntax: `infographic
design
  structure showcase-stack
    gap 24
  title default
  item simple
    width 220
theme dark
data
  title Stack
  lists
    - label Plan
      desc Scope the work
      icon lightbulb
    - label Build
      desc Make the thing
      icon gear`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The add and remove buttons are in the SVG but hidden: 0.2.20 draws its BtnsGroup with display: none.' });
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: !ctx.preview,
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

  return () => {
    stage.dispose();
  };
};

export default mount;
