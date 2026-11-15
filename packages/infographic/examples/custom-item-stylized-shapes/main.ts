// A showcase-shape-card item inside a ShapesGroup for stylize
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerItem } from '@antv/infographic';
import { ShapeCard } from './shape-card.tsx';

// Page-wide name; the component is drawn by any structure that is given design.item.
registerItem('showcase-shape-card', { component: ShapeCard, composites: ['label'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'no stylize',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-shape-card
    width 120
theme dark
data
  title Stylised shapes
  lists
    - label One
    - label Two
    - label Three`,
  },
  {
    say: 'stylize rough',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-shape-card
    width 120
theme dark
  stylize rough
data
  title Stylised shapes
  lists
    - label One
    - label Two
    - label Three`,
  },
  {
    say: 'stylize pattern, pattern dot',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-shape-card
    width 120
theme dark
  stylize pattern
    pattern dot
data
  title Stylised shapes
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

  return () => {
    stage.dispose();
  };
};

export default mount;
