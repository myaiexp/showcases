// theme.item styles one part of every data item: its label, description, value or icon
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'item.label fill #FF356A',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
  item
    label
      fill #FF356A
data
  lists
    - label Step 1
      desc Start
      value 12
      icon rocket
    - label Step 2
      desc In Progress
      value 48
      icon gears
    - label Step 3
      desc Complete
      value 96
      icon trophy`,
  },
  {
    say: 'item.desc fill #ffd166',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
  item
    desc
      fill #ffd166
data
  lists
    - label Step 1
      desc Start
      value 12
      icon rocket
    - label Step 2
      desc In Progress
      value 48
      icon gears
    - label Step 3
      desc Complete
      value 96
      icon trophy`,
  },
  {
    say: 'item.value fill #61DDAA, font-size 26',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
  item
    value
      fill #61DDAA
      font-size 26
data
  lists
    - label Step 1
      desc Start
      value 12
      icon rocket
    - label Step 2
      desc In Progress
      value 48
      icon gears
    - label Step 3
      desc Complete
      value 96
      icon trophy`,
  },
  {
    say: 'item.icon fill #F6BD16',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
  item
    icon
      fill #F6BD16
data
  lists
    - label Step 1
      desc Start
      value 12
      icon rocket
    - label Step 2
      desc In Progress
      value 48
      icon gears
    - label Step 3
      desc Complete
      value 96
      icon trophy`,
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
