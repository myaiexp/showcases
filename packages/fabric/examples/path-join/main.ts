// Paths: joinPath(commands, digits) turns path commands back into a d string, rounded to the digits you ask for
import { Canvas, Path, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'The star is described in small units and scaled up 20 times, so rounding its coordinates is visible. The panel shows the string joinPath() returns.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  // a long, many-decimals d string: parsePath reads it, joinPath writes it back
  const raw = Array.from({ length: 30 }, (_, i) => {
    const a = (i / 30) * Math.PI * 2;
    const r = 3 + 1.3 * Math.sin(a * 5);
    return `${i ? 'L' : 'M'} ${(Math.cos(a) * r).toFixed(6)} ${(Math.sin(a) * r).toFixed(6)}`;
  }).join(' ') + ' Z';
  const commands = util.parsePath(raw);

  let panel: HTMLDivElement | undefined;
  if (!stage.preview) {
    panel = document.createElement('div');
    panel.style.cssText = 'font:12px/1.5 ui-monospace,monospace;color:var(--fg-2);max-width:740px;word-break:break-all;max-height:5.5em;overflow:hidden';
    stage.box.insertBefore(panel, stage.bar);
  }

  let path: Path | undefined;
  const show = (digits: number): void => {
    const d = util.joinPath(util.makePathSimpler(commands), digits);
    if (path) canvas.remove(path);
    path = new Path(d, { left: 160, top: 110, scaleX: 20, scaleY: 20, strokeUniform: true, objectCaching: false, fill: 'rgba(233,75,60,0.3)', stroke: '#8c2418', strokeWidth: 2, selectable: false, evented: false });
    canvas.add(path);
    say(`fractionDigits ${digits} · ${d.length} characters`);
    if (panel) panel.textContent = d;
    canvas.requestRenderAll();
  };
  show(0);
  if (stage.bar) slider(stage.bar, 'fractionDigits', 0, 4, 1, 0, show);
  else {
    let i = 0;
    stage.every(900, () => show(i++ % 5));
  }

  return stage.dispose;
};

export default mount;
