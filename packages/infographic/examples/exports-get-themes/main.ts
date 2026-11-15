// getThemes(): the theme names, each one applied to the same infographic
import { getThemes, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
data
  title Themes by name
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The hand-drawn theme sets no background colour: give it paper to sit on.
  stage.box.style.background = '#f6f1e4';
  const names = getThemes();
  const side = stage.side('getThemes()');
  if (side) side.textContent = JSON.stringify(names, null, 2);
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }));
  infographic.render(SYNTAX);

  stage.cycle(
    names.map((theme) => ({
      say: `getThemes() -> ${JSON.stringify(names)}; theme: '${theme}'`,
      run: () => infographic.update({ theme }),
    })),
  );
  return () => stage.dispose();
};

export default mount;
