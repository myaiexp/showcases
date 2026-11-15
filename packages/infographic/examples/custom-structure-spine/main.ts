// A showcase-spine structure mirroring items with positionH
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerStructure } from '@antv/infographic';
import { Spine } from './spine.tsx';

registerStructure('showcase-spine', { component: Spine, composites: ['title', 'item'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'three items alternate sides',
    syntax: `infographic
design
  structure showcase-spine
    gap 8
  title default
  item simple
    width 150
theme dark
data
  title Spine
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
    say: 'five items',
    syntax: `infographic
design
  structure showcase-spine
    gap 8
  title default
  item simple
    width 150
theme dark
data
  title Spine
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
      icon rocket
    - label Learn
      desc Look at the numbers
      icon chart-line`,
  },
  {
    say: 'four items, wider gap',
    syntax: `infographic
design
  structure showcase-spine
    gap 24
  title default
  item simple
    width 150
theme dark
data
  title Spine
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

  return () => {
    stage.dispose();
  };
};

export default mount;
