// The mount/unmount lifecycle: new Infographic, render(), destroy(), repeated
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-column-simple-vertical-arrow
theme dark
data
  lists
    - label Mounted
      desc new Infographic()
    - label Drawn
      desc render(syntax)
    - label Unmounted
      desc destroy()`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let infographic: Infographic | null = null;

  stage.cycle([
    {
      say: 'new Infographic({ container, width, height })',
      run: () => {
        infographic = stage.own(
          new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
        );
      },
      hold: 900,
    },
    {
      say: 'infographic.render(syntax)',
      run: () => infographic?.render(SYNTAX),
    },
    {
      say: 'infographic.destroy(): the container is empty again',
      run: () => {
        infographic?.destroy();
        infographic = null;
        stage.box.replaceChildren();
      },
      hold: 1100,
    },
  ]);

  return () => stage.dispose();
};

export default mount;
