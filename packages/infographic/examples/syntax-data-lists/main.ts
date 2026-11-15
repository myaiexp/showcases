// lists holds peer items with label, desc and icon, with no order implied
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'lists with a label and an icon per item',
    syntax: `infographic list-grid-compact-card
theme dark
data
  title Fruit Shopping List
  lists
    - label Watermelon
      icon watermelon
    - label Apple
      icon apple
    - label Banana
      icon banana`,
  },
  {
    say: 'Add a fourth item and the grid grows',
    syntax: `infographic list-grid-compact-card
theme dark
data
  title Fruit Shopping List
  lists
    - label Watermelon
      icon watermelon
    - label Apple
      icon apple
    - label Banana
      icon banana
    - label Lemon
      icon lemon`,
  },
  {
    say: 'Same lists under list-grid-ribbon-card',
    syntax: `infographic list-grid-ribbon-card
theme dark
data
  title Fruit Shopping List
  lists
    - label Watermelon
      icon watermelon
    - label Apple
      icon apple
    - label Banana
      icon banana
    - label Lemon
      icon lemon`,
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
