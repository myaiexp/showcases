// A showcase-gradient-card item filled with a Defs gradient
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { registerItem } from '@antv/infographic';
import { GradientCard } from './gradient-card.tsx';

// Page-wide name; the component is drawn by any structure that is given design.item.
registerItem('showcase-gradient-card', { component: GradientCard, composites: ['label', 'desc'] });

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'colorPrimary #ff7a45',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-gradient-card
    width 130
theme dark
  colorPrimary #ff7a45
data
  title Gradients
  lists
    - label Alpha
      desc First pass
    - label Beta
      desc Wider test
    - label Gamma
      desc Ready`,
  },
  {
    say: 'colorPrimary #36cfc9',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-gradient-card
    width 130
theme dark
  colorPrimary #36cfc9
data
  title Gradients
  lists
    - label Alpha
      desc First pass
    - label Beta
      desc Wider test
    - label Gamma
      desc Ready`,
  },
  {
    say: 'colorPrimary #9254de',
    syntax: `infographic
design
  structure list-row
    gap 16
  title default
  item showcase-gradient-card
    width 130
theme dark
  colorPrimary #9254de
data
  title Gradients
  lists
    - label Alpha
      desc First pass
    - label Beta
      desc Wider test
    - label Gamma
      desc Ready`,
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
