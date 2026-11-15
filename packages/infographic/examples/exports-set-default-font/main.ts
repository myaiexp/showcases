// setDefaultFont(): the page-wide default family, restored when the example ends
import { Infographic, setDefaultFont } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LOCAL_FONTS } from '../../shared/fonts.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  title Default font
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;

/** The library's own default family; the package does not export a getter to read it back. */
const LIBRARY_DEFAULT = 'Alibaba PuHuiTi';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }));
  // Setting the default is page-wide: leave it as it was found.
  stage.onDispose(() => setDefaultFont(LIBRARY_DEFAULT));

  const apply = (family: string) => {
    setDefaultFont(family);
    infographic.render(SYNTAX);
    stage.say(`setDefaultFont('${family}')`);
  };
  stage.select('Default font', LOCAL_FONTS, LIBRARY_DEFAULT, apply);
  stage.cycle(LOCAL_FONTS.map((family) => ({ run: () => apply(family) })));
  return () => stage.dispose();
};

export default mount;
