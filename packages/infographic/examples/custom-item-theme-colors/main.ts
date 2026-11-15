// A showcase-swatch-item listing the themeColors an item receives
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerItem } from '@antv/infographic';
import { SwatchItem } from './swatch-item.tsx';

// Page-wide name; the component is drawn by any structure that is given design.item.
registerItem('showcase-swatch-item', { component: SwatchItem, composites: ['label'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'dark theme, colorPrimary #3b82f6',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-swatch-item
    width 120
theme dark
  colorPrimary #3b82f6
data
  title Derived colours
  lists
    - label Brand
    - label Calm
    - label Bold`,
  },
  {
    say: 'dark theme, colorPrimary #f43f5e',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-swatch-item
    width 120
theme dark
  colorPrimary #f43f5e
data
  title Derived colours
  lists
    - label Brand
    - label Calm
    - label Bold`,
  },
  {
    say: 'light background, colorPrimary #16a34a',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-swatch-item
    width 120
theme
  colorPrimary #16a34a
  colorBg #ffffff
data
  title Derived colours
  lists
    - label Brand
    - label Calm
    - label Bold`,
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
