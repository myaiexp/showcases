// getPalettes(): the registry as swatch rows, each palette applied to a render
import { getPalettes, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-grid-compact-card
theme dark
data
  lists
    - label One
      icon star
    - label Two
      icon heart
    - label Three
      icon bell
    - label Four
      icon bolt
    - label Five
      icon flag
    - label Six
      icon gear`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 340 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const drawn = document.createElement('div');
  drawn.style.cssText = 'flex:3;position:relative;min-width:0';
  const sheet = document.createElement('div');
  sheet.style.cssText = 'flex:2;min-width:0;display:flex;flex-direction:column;gap:6px;justify-content:center;font:10px monospace;color:#aaa';
  stage.box.append(drawn, sheet);

  // 0.2.20: an object of name -> Palette, not an array.
  const palettes = getPalettes() as Record<string, string | string[] | ((ratio: number, index: number, count: number) => string)>;
  const rows = Object.entries(palettes).map(([name, palette]) => {
    const colours = typeof palette === 'function' ? Array.from({ length: 8 }, (_, i) => palette(i / 7, i, 8)) : Array.isArray(palette) ? palette : [];
    const row = document.createElement('div');
    row.style.cssText = 'padding:3px;border-radius:5px;border:1px solid transparent';
    const strip = document.createElement('div');
    strip.style.cssText = 'display:flex;height:16px;margin-top:2px';
    for (const c of colours) {
      const s = document.createElement('span');
      s.style.cssText = `flex:1;background:${c}`;
      strip.append(s);
    }
    row.append(`${name} (${typeof palette === 'function' ? 'function' : 'array of ' + colours.length})`, strip);
    sheet.append(row);
    return { name, row };
  });

  const infographic = stage.own(new Infographic({ container: drawn, width: '100%', height: '100%', padding: ctx.preview ? 6 : 20 }));
  stage.cycle(
    rows.map(({ name }) => ({
      say: `getPalettes() -> ${rows.length} palettes; themeConfig.palette: '${name}'`,
      run: () => {
        for (const r of rows) r.row.style.borderColor = r.name === name ? '#F6BD16' : 'transparent';
        infographic.render(SYNTAX);
        infographic.update({ themeConfig: { palette: name } });
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
