// destroy(): the SVG goes, the destroyed event fires, listeners are dropped
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-column-simple-vertical-arrow
theme dark
data
  lists
    - label Created
      desc new Infographic()
    - label Drawn
      desc render()
    - label Gone
      desc destroy()`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let infographic: Infographic | null = null;
  let generation = 0;

  stage.cycle([
    {
      say: 'new Infographic() + render(): an <svg> in the box',
      run: () => {
        generation += 1;
        const g = generation;
        infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }));
        infographic.on('destroyed', () => stage.say(`instance ${g}: "destroyed" event, svg left in box: ${stage.box.querySelectorAll('svg').length}`, 'warn'));
        infographic.render(SYNTAX);
      },
      hold: 1600,
    },
    {
      run: () => {
        // The event fires after the node is removed and before the listeners are dropped.
        infographic?.destroy();
        infographic = null;
      },
      hold: 1400,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
