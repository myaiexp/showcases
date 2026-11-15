// theme.base.text.fill on one line draws the same as three nested blocks
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'Dotted: theme.base.text.fill #ffd166',
    syntax: `infographic list-grid-compact-card
theme.base.text.fill #ffd166
data
  lists
    - label Dotted
      icon bolt
    - label Short
      icon scissors
    - label Same
      icon equals`,
  },
  {
    say: 'Nested: theme / base / text / fill, same picture',
    syntax: `infographic list-grid-compact-card
theme
  base
    text
      fill #ffd166
data
  lists
    - label Dotted
      icon bolt
    - label Short
      icon scissors
    - label Same
      icon equals`,
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
