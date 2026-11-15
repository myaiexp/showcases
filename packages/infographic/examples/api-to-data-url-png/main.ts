// toDataURL({ type: 'png', dpr }): a bitmap export shown in an <img>
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 320 });
  stage.box.style.display = 'flex';
  stage.box.style.gap = '6px';
  const live = document.createElement('div');
  live.style.cssText = 'flex:1;position:relative;min-width:0';
  const img = document.createElement('img');
  img.alt = 'the PNG export';
  img.style.cssText = 'flex:1;min-width:0;object-fit:contain;border-radius:6px;background:#1b1b1e';
  stage.box.append(live, img);

  const infographic = stage.own(new Infographic({ container: live, width: '100%', height: '100%', padding: ctx.preview ? 4 : 16 }));
  infographic.render(SYNTAX);

  const exportAt = async (dpr: number) => {
    const url = await infographic.toDataURL({ type: 'png', dpr });
    if (stage.disposed) return;
    img.onload = () => stage.say(`{ type: 'png', dpr: ${dpr} } -> ${img.naturalWidth} x ${img.naturalHeight} px`);
    img.src = url;
  };
  stage.select('dpr', ['1', '2', '3'], '1', (v) => void exportAt(Number(v)));
  stage.cycle([1, 2, 3].map((dpr) => ({ run: () => exportAt(dpr), hold: 1800 })));
  return () => stage.dispose();
};

export default mount;
