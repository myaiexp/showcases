// design picks the structure, item and title, each with its own indented options
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'structure list-row, item simple: default options',
    syntax: `infographic
design
  structure list-row
  item simple
  title default
theme dark
data
  title Design block
  desc Structure, item and title
  lists
    - label Alpha
      desc First card
    - label Beta
      desc Second card
    - label Gamma
      desc Third card`,
  },
  {
    say: 'structure list-row with gap 40',
    syntax: `infographic
design
  structure list-row
    gap 40
  item simple
  title default
theme dark
data
  title Design block
  desc Structure, item and title
  lists
    - label Alpha
      desc First card
    - label Beta
      desc Second card
    - label Gamma
      desc Third card`,
  },
  {
    say: 'zigzag true on the structure, title aligned left',
    syntax: `infographic
design
  structure list-row
    gap 0
    zigzag true
  item horizontal-icon-arrow
  title default
    align-horizontal left
theme dark
data
  title Design block
  desc Structure, item and title
  lists
    - label Alpha
      desc First card
      icon star
    - label Beta
      desc Second card
      icon heart
    - label Gamma
      desc Third card
      icon bell`,
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
