// A showcase-value-card item with a value shown only when present
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerItem } from '@antv/infographic';
import { ValueCard } from './value-card.tsx';

// Page-wide name; the component is drawn by any structure that is given design.item.
registerItem('showcase-value-card', { component: ValueCard, composites: ['label', 'value'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'three cards with values',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-value-card
    width 150
theme dark
data
  title Key numbers
  lists
    - label Visits
      value 1280
    - label Orders
      value 342
    - label Refunds
      value 12`,
  },
  {
    say: 'bigger numbers',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-value-card
    width 150
theme dark
data
  title Key numbers
  lists
    - label Visits
      value 48200
    - label Orders
      value 9140
    - label Refunds
      value 205`,
  },
  {
    say: 'the middle item has no value',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-value-card
    width 150
theme dark
data
  title Key numbers
  lists
    - label Visits
      value 1280
    - label Orders (no value)
    - label Refunds
      value 12`,
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
