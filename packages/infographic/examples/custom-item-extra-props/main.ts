// A showcase-tag-item item with accent, radius and uppercase props
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerItem } from '@antv/infographic';
import { TagItem } from './tag-item.tsx';

// Page-wide name; the component is drawn by any structure that is given design.item.
registerItem('showcase-tag-item', { component: TagItem, composites: ['label'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'accent #22c55e, radius 4',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-tag-item
    width 130
    accent #22c55e
    radius 4
    uppercase false
theme dark
data
  title Release tags
  lists
    - label stable
    - label beta
    - label nightly`,
  },
  {
    say: 'accent #f59e0b, radius 20',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-tag-item
    width 130
    accent #f59e0b
    radius 20
    uppercase false
theme dark
data
  title Release tags
  lists
    - label stable
    - label beta
    - label nightly`,
  },
  {
    say: 'accent #ec4899, radius 20, uppercase true',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-tag-item
    width 130
    accent #ec4899
    radius 20
    uppercase true
theme dark
data
  title Release tags
  lists
    - label stable
    - label beta
    - label nightly`,
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
