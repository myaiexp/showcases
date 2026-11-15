// getTheme(name): the ThemeConfig object, printed beside the theme at work
import { getTheme, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
data
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;
const NAMES = ['light', 'dark', 'hand-drawn', 'default'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 320 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const drawn = document.createElement('div');
  drawn.style.cssText = 'flex:1;position:relative;min-width:0';
  const json = document.createElement('pre');
  json.style.cssText = `flex:1;min-width:0;margin:0;overflow:hidden;font:${ctx.preview ? 9 : 13}px monospace;color:#9cdcfe;white-space:pre-wrap;background:#111;padding:6px;border-radius:6px`;
  stage.box.append(drawn, json);
  const infographic = stage.own(new Infographic({ container: drawn, width: '100%', height: '100%', padding: ctx.preview ? 4 : 16 }));
  infographic.render(SYNTAX);

  stage.cycle(
    NAMES.map((name) => ({
      run: () => {
        const theme = getTheme(name);
        json.textContent = theme ? JSON.stringify(theme, null, 2) : 'undefined';
        stage.say(theme ? `getTheme('${name}')` : `getTheme('${name}') -> undefined`, theme ? 'info' : 'warn');
        if (theme) infographic.update({ theme: name });
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
