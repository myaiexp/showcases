// getFont(name): the Font object or null; a found family is applied
import { getFont, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  title Fonts by name
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;
const NAMES = ['Alibaba PuHuiTi', 'Source Han Serif', 'LXGW WenKai', '851tegakizatsu', 'Comic Neue'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('getFont(name)');
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }));
  infographic.render(SYNTAX);

  stage.cycle(
    NAMES.map((name) => ({
      run: () => {
        const font = getFont(name);
        stage.say(font ? `getFont('${name}') -> { fontFamily: ${font.fontFamily}, ... }` : `getFont('${name}') -> null`, font ? 'ok' : 'warn');
        if (side) side.textContent = JSON.stringify(font, null, 2);
        // Only a found font is applied: the lookup decides what the render uses.
        if (font) infographic.update({ themeConfig: { base: { text: { 'font-family': name } } } });
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
