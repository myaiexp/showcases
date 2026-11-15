// getPaletteColor(): one colour by index, cycling arrays and spreading functions
import { getPaletteColor } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const CASES: { name: string; palette: string | string[]; total: number }[] = [
  { name: "'antv', total 6", palette: 'antv', total: 6 },
  { name: "'spectral', total 5", palette: 'spectral', total: 5 },
  { name: "'spectral', total 12", palette: 'spectral', total: 12 },
  { name: "['#e63946', '#f1faee', '#457b9d'], total 7", palette: ['#e63946', '#f1faee', '#457b9d'], total: 7 },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 220 });
  stage.box.style.cssText += ';background:#161618;display:flex;flex-direction:column;justify-content:center;gap:8px;padding:12px;font:12px monospace;color:#aaa';
  const label = document.createElement('div');
  const strip = document.createElement('div');
  strip.style.cssText = `display:flex;gap:4px;height:${ctx.preview ? 40 : 64}px`;
  stage.box.append(label, strip);

  stage.cycle(
    CASES.map(({ name, palette, total }) => ({
      say: `getPaletteColor(${typeof palette === 'string' ? `'${palette}'` : 'array'}, [i], ${total})`,
      run: () => {
        label.textContent = `index 0 to ${total - 1}`;
        strip.replaceChildren(
          ...Array.from({ length: total }, (_, i) => {
            const c = getPaletteColor(palette, [i], total) ?? '#000';
            const s = document.createElement('span');
            s.style.cssText = `flex:1;background:${c};border-radius:4px;display:flex;align-items:flex-end;justify-content:center;font-size:9px;color:#000a`;
            s.textContent = String(i);
            s.title = c;
            return s;
          }),
        );
      },
      hold: ctx.preview ? 1500 : 2400,
    })),
  );
  return () => stage.dispose();
};

export default mount;
