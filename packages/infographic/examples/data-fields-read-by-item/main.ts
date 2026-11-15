// The same label, desc, value and icon data drawn by items that use different fields
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'item simple',
    syntax: `infographic
design
  structure list-grid
  item simple
  title default
theme dark
data
  lists
    - label Uptime
      desc Last 30 days
      value 99
      icon server
    - label Coverage
      desc Test suite
      value 82
      icon vial
    - label Score
      desc Customer survey
      value 64
      icon star`,
  },
  {
    say: 'item compact-card',
    syntax: `infographic
design
  structure list-grid
  item compact-card
  title default
theme dark
data
  lists
    - label Uptime
      desc Last 30 days
      value 99
      icon server
    - label Coverage
      desc Test suite
      value 82
      icon vial
    - label Score
      desc Customer survey
      value 64
      icon star`,
  },
  {
    say: 'item circular-progress',
    syntax: `infographic
design
  structure list-grid
  item circular-progress
  title default
theme dark
data
  lists
    - label Uptime
      desc Last 30 days
      value 99
      icon server
    - label Coverage
      desc Test suite
      value 82
      icon vial
    - label Score
      desc Customer survey
      value 64
      icon star`,
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
