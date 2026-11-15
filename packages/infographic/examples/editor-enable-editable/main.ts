// editable: true turns on the editor; the card fakes an edit by re-rendering
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const syntax = (label: string) => `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label ${label}
      desc Double-click to edit
      icon pen
    - label Build
      desc Drag to move
      icon hammer
    - label Ship
      desc Select with a click
      icon rocket`;

const TYPED = ['Plan', 'Plan A', 'Plan Ahead', 'Roadmap'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    hint: 'Double-click a label to edit it. Click to select, drag to move, hold Space and drag to pan, Ctrl+wheel to zoom.',
  });
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      // The editor only exists in the full view; the card has no pointer to drive it.
      editable: !ctx.preview,
    }),
  );
  infographic.render(syntax(TYPED[0] as string));

  if (ctx.preview) {
    stage.cycle(
      TYPED.map((label) => ({
        say: `a label edit: "${label}"`,
        run: () => infographic.render(syntax(label)),
        hold: 900,
      })),
    );
  } else {
    stage.say('editable: true');
  }
  return () => stage.dispose();
};

export default mount;
