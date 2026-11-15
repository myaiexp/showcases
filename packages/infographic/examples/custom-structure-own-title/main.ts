// A showcase-banner structure drawing the title text on its own
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerStructure } from '@antv/infographic';
import { Banner } from './banner.tsx';

registerStructure('showcase-banner', { component: Banner, composites: ['title', 'item'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'data.title drawn by the structure',
    syntax: `infographic
design
  structure showcase-banner
  item simple
    width 120
    showIcon false
theme dark
data
  title Launch week
  desc Five things to do
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
    say: 'a different title and desc',
    syntax: `infographic
design
  structure showcase-banner
  item simple
    width 120
    showIcon false
theme dark
data
  title Quiet week
  desc Nothing is on fire
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
