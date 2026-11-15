// A showcase-icon-chip item mirrored by positionH
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerItem } from '@antv/infographic';
import { IconChip } from './icon-chip.tsx';

// Page-wide name; the component is drawn by any structure that is given design.item.
registerItem('showcase-icon-chip', { component: IconChip, composites: ['icon', 'label'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'list-column: every item normal',
    syntax: `infographic
design
  structure list-column
    gap 14
  title default
  item showcase-icon-chip
    width 190
theme dark
data
  title Team
  lists
    - label Design
      icon palette
    - label Backend
      icon database
    - label Support
      icon headset`,
  },
  {
    say: 'zigzag true: normal, flipped, normal',
    syntax: `infographic
design
  structure list-column
    gap 14
    zigzag true
  title default
  item showcase-icon-chip
    width 190
theme dark
data
  title Team
  lists
    - label Design
      icon palette
    - label Backend
      icon database
    - label Support
      icon headset`,
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
