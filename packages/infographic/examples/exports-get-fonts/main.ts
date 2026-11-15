// getFonts(): every registered font, drawn in itself on a specimen sheet
import { getFonts } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SAMPLES = ['The quick brown fox', 'Infographic 0123456789', 'Plan, build, ship'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 320 });
  stage.box.style.cssText += ';background:#161618;overflow:auto;padding:8px;display:flex;flex-direction:column;gap:6px';
  const fonts = getFonts();
  const rows = fonts.map((font) => {
    const row = document.createElement('div');
    const meta = document.createElement('div');
    meta.style.cssText = 'font:10px monospace;color:#8a8a92;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
    meta.textContent = `${font.fontFamily}  ·  ${font.name}  ·  weights: ${Object.keys(font.fontWeight).join(', ')}`;
    const sample = document.createElement('div');
    sample.style.cssText = `font-family:${font.fontFamily}, sans-serif;font-size:${ctx.preview ? 17 : 26}px;color:#f2f2f2;white-space:nowrap;overflow:hidden`;
    row.append(meta, sample);
    stage.box.append(row);
    return sample;
  });

  stage.cycle(
    SAMPLES.map((text) => ({
      say: `getFonts() -> ${fonts.length} Font objects`,
      run: () => rows.forEach((r) => (r.textContent = text)),
    })),
  );
  return () => stage.dispose();
};

export default mount;
