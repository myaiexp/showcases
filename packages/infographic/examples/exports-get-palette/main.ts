// getPalette(name): an array, a function sampled across a gradient, or undefined
import { getPalette } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 200 });
  stage.box.style.cssText += ';background:#161618;display:flex;flex-direction:column;justify-content:center;gap:10px;padding:12px;font:12px monospace;color:#aaa';
  const label = document.createElement('div');
  const strip = document.createElement('div');
  strip.style.cssText = `display:flex;height:${ctx.preview ? 36 : 56}px;border-radius:6px;overflow:hidden;border:1px solid #333`;
  stage.box.append(label, strip);

  stage.cycle(
    ['antv', 'spectral', 'sunset'].map((name) => ({
      run: () => {
        const palette = getPalette(name);
        const colours =
          typeof palette === 'function' ? Array.from({ length: 8 }, (_, i) => palette(i / 7, i, 8)) : Array.isArray(palette) ? palette : [];
        label.textContent = `getPalette('${name}') -> ${palette === undefined ? 'undefined' : typeof palette === 'function' ? 'function(ratio, index, count)' : `string[${colours.length}]`}`;
        strip.replaceChildren(
          ...colours.map((c) => {
            const s = document.createElement('span');
            s.style.cssText = `flex:1;background:${c}`;
            s.title = c;
            return s;
          }),
        );
        stage.say(palette ? `${colours[0]} ... ${colours[colours.length - 1]}` : 'not registered', palette ? 'info' : 'warn');
      },
      hold: 1500,
    })),
  );
  return () => stage.dispose();
};

export default mount;
