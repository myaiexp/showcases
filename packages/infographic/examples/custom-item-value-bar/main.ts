// A showcase-bar-item item drawing datum.value as a bar
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerItem } from '@antv/infographic';
import { BarItem } from './bar-item.tsx';

// Page-wide name; the component is drawn by any structure that is given design.item.
registerItem('showcase-bar-item', { component: BarItem, composites: ['label', 'value'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'values 80, 55, 30',
    syntax: `infographic
design
  structure list-column
    gap 14
  title default
  item showcase-bar-item
    width 300
theme dark
data
  title Skills
  lists
    - label Typing
      value 80
    - label Drawing
      value 55
    - label Cooking
      value 30`,
  },
  {
    say: 'values 20, 95, 60',
    syntax: `infographic
design
  structure list-column
    gap 14
  title default
  item showcase-bar-item
    width 300
theme dark
data
  title Skills
  lists
    - label Typing
      value 20
    - label Drawing
      value 95
    - label Cooking
      value 60`,
  },
  {
    say: 'values 100, 100, 5',
    syntax: `infographic
design
  structure list-column
    gap 14
  title default
  item showcase-bar-item
    width 300
theme dark
data
  title Skills
  lists
    - label Typing
      value 100
    - label Drawing
      value 100
    - label Cooking
      value 5`,
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
