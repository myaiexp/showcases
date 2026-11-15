// A showcase-ring structure registered with registerStructure
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerStructure } from '@antv/infographic';
import { Ring } from './ring.tsx';

// The name is page-wide and stays registered; composites lists what the structure draws.
registerStructure('showcase-ring', { component: Ring, composites: ['title', 'item'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'showcase-ring, radius 120, 4 items',
    syntax: `infographic
design
  structure showcase-ring
    radius 120
  title default
  item simple
    width 120
    iconType circle
theme dark
data
  title Release loop
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
    say: 'radius 160, 5 items',
    syntax: `infographic
design
  structure showcase-ring
    radius 160
  title default
  item simple
    width 120
    iconType circle
theme dark
data
  title Release loop
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
    say: 'radius 100, 3 items',
    syntax: `infographic
design
  structure showcase-ring
    radius 100
  title default
  item simple
    width 120
    iconType circle
theme dark
data
  title Release loop
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
