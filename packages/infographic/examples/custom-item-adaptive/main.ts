// A showcase-adaptive-card item that skips absent fields
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerItem } from '@antv/infographic';
import { AdaptiveCard } from './adaptive-card.tsx';

// Page-wide name; the component is drawn by any structure that is given design.item.
registerItem('showcase-adaptive-card', { component: AdaptiveCard, composites: ['icon', 'label', 'desc', 'value'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'all four fields',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-adaptive-card
    width 140
theme dark
data
  title Missing fields
  lists
    - icon bolt
      label Speed
      desc Quick starts
      value 92
    - icon shield
      label Safety
      desc Safe defaults
      value 88`,
  },
  {
    say: 'no icon',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-adaptive-card
    width 140
theme dark
data
  title Missing fields
  lists
    - label Speed
      desc Quick starts
      value 92
    - label Safety
      desc Safe defaults
      value 88`,
  },
  {
    say: 'label and value only',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-adaptive-card
    width 140
theme dark
data
  title Missing fields
  lists
    - label Speed
      value 92
    - label Safety
      value 88`,
  },
  {
    say: 'label only',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-adaptive-card
    width 140
theme dark
data
  title Missing fields
  lists
    - label Speed
    - label Safety`,
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
