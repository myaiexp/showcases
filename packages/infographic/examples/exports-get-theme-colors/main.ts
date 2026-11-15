// getThemeColors(): the derived colour set, drawn as chips beside a render
import { getThemeColors, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-grid-compact-card
data
  lists
    - label Plan
      icon list-check
    - label Build
      icon hammer
    - label Ship
      icon rocket`;
const PAIRS = [
  { colorPrimary: '#ff5722', colorBg: '#111111' },
  { colorPrimary: '#1783FF', colorBg: '#ffffff' },
  { colorPrimary: '#7ae582', colorBg: '#0b3d2e' },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 320 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const drawn = document.createElement('div');
  drawn.style.cssText = 'flex:1;position:relative;min-width:0';
  const chips = document.createElement('div');
  chips.style.cssText = `flex:1;min-width:0;display:grid;grid-template-columns:${ctx.preview ? '1fr' : '1fr 1fr'};gap:1px 6px;align-content:center;font:${ctx.preview ? 8 : 11}px monospace;color:#ddd;overflow:hidden`;
  stage.box.append(drawn, chips);
  const infographic = stage.own(new Infographic({ container: drawn, width: '100%', height: '100%', padding: ctx.preview ? 4 : 16 }));
  infographic.render(SYNTAX);

  stage.cycle(
    PAIRS.map((pair) => ({
      say: `getThemeColors(${JSON.stringify(pair)})`,
      run: () => {
        const colours = getThemeColors(pair);
        chips.replaceChildren(
          ...Object.entries(colours).map(([key, value]) => {
            const row = document.createElement('div');
            row.style.cssText = 'display:flex;align-items:center;gap:6px';
            const sw = document.createElement('span');
            sw.style.cssText = `width:${typeof value === 'string' ? 22 : 0}px;height:12px;background:${typeof value === 'string' ? value : 'none'};border:1px solid #555;flex:none`;
            row.append(sw, `${key} ${value}`);
            return row;
          }),
        );
        infographic.update({ themeConfig: { colorPrimary: pair.colorPrimary, colorBg: pair.colorBg } });
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
