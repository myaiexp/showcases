// design.title default draws data.title and data.desc, with align-horizontal and desc-line-number
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'align-horizontal left',
    syntax: `infographic
design
  structure list-row
  item simple
  title default
    align-horizontal left
theme dark
data
  title A rather long infographic title
  desc This is the description text of the infographic, long enough that it needs more than one line to show in full
  lists
    - label One
    - label Two
    - label Three`,
  },
  {
    say: 'align-horizontal center',
    syntax: `infographic
design
  structure list-row
  item simple
  title default
    align-horizontal center
theme dark
data
  title A rather long infographic title
  desc This is the description text of the infographic, long enough that it needs more than one line to show in full
  lists
    - label One
    - label Two
    - label Three`,
  },
  {
    say: 'align-horizontal right',
    syntax: `infographic
design
  structure list-row
  item simple
  title default
    align-horizontal right
theme dark
data
  title A rather long infographic title
  desc This is the description text of the infographic, long enough that it needs more than one line to show in full
  lists
    - label One
    - label Two
    - label Three`,
  },
  {
    say: 'desc-line-number 1: the description is cut to one line',
    syntax: `infographic
design
  structure list-row
  item simple
  title default
    align-horizontal left
    desc-line-number 1
theme dark
data
  title A rather long infographic title
  desc This is the description text of the infographic, long enough that it needs more than one line to show in full
  lists
    - label One
    - label Two
    - label Three`,
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
