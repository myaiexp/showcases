// A showcase-stairs structure colouring items from the palette
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerStructure } from '@antv/infographic';
import { Stairs } from './stairs.tsx';

registerStructure('showcase-stairs', { component: Stairs, composites: ['title', 'item'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'palette: three warm colours',
    syntax: `infographic
design
  structure showcase-stairs
  title default
  item simple
    width 110
    iconType circle
theme dark
  palette
    - #F4B942
    - #E8704A
    - #C2185B
data
  title Climb
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
    say: 'palette: cool blues and green',
    syntax: `infographic
design
  structure showcase-stairs
  title default
  item simple
    width 110
    iconType circle
theme dark
  palette
    - #4EA8DE
    - #5E60CE
    - #56CFE1
    - #80ED99
data
  title Climb
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
    say: 'palette: one colour for every step',
    syntax: `infographic
design
  structure showcase-stairs
  title default
  item simple
    width 110
    iconType circle
theme dark
  palette
    - #61DDAA
data
  title Climb
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
