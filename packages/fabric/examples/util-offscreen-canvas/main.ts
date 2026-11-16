// util.createCanvasElement, toDataURL and loadImage: draw, encode, decode, show
import { Canvas, FabricImage, FabricText, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const SIZE = 120;

/** Paints concentric rings on a canvas element that is never in the page. */
function paint(el: HTMLCanvasElement, hue: number): void {
  const g = el.getContext('2d')!;
  g.clearRect(0, 0, el.width, el.height);
  for (let i = 6; i > 0; i--) {
    g.fillStyle = `hsl(${(hue + i * 25) % 360} 70% ${40 + i * 7}%)`;
    g.beginPath();
    g.arc(el.width / 2, el.height / 2, (i * el.width) / 14, 0, Math.PI * 2);
    g.fill();
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['createCanvasElement()', 'toDataURL → loadImage'],
    scene: [160, 200],
    hint: 'Left: an offscreen <canvas> from util.createCanvasElement(), drawn with the 2D API and shown through a FabricImage. Right: util.toDataURL(canvas, format, quality) encodes it, util.loadImage(url) decodes that string back into an <img>, and a second FabricImage shows it.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const left = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const right = stage.own(new Canvas(pb.el, { selection: false, skipTargetFind: true }), pb);
  const say = briefStatus(stage, pb);

  const source = util.createCanvasElement();
  source.width = SIZE;
  source.height = SIZE;
  paint(source, 0);
  const a = new FabricImage(source, { left: 80, top: 90, objectCaching: false });
  left.add(a, new FabricText('canvas element', { left: 80, top: 170, fontSize: 12, fontFamily: 'monospace', fill: '#555' }));

  const o = { format: 'png' as 'png' | 'jpeg', quality: 0.5 };
  const b = new FabricImage(util.createCanvasElement(), { left: 80, top: 90, objectCaching: false });
  right.add(b, new FabricText('decoded <img>', { left: 80, top: 170, fontSize: 12, fontFamily: 'monospace', fill: '#555' }));
  let busy = false;
  let hue = 0;

  const round = async (): Promise<void> => {
    if (busy) return;
    busy = true;
    paint(source, hue);
    a.dirty = true;
    left.requestRenderAll();
    const url = util.toDataURL(source, o.format, o.quality); // 'data:image/png;base64,…'
    const img = await util.loadImage(url);
    busy = false;
    if (stage.disposed || right.disposed) return;
    b.setElement(img);
    b.dirty = true;
    right.requestRenderAll();
    say(`${o.format} · ${(url.length / 1024).toFixed(1)} kB\n${img.naturalWidth}×${img.naturalHeight} decoded`);
  };
  void round();

  stage.every(stage.preview ? 1200 : 900, () => {
    hue = (hue + 40) % 360;
    void round();
  });
  if (stage.bar) {
    select(stage.bar, 'format', ['png', 'jpeg'] as const, (v) => (o.format = v));
    slider(stage.bar, 'quality (jpeg)', 0.05, 1, 0.05, o.quality, (v) => (o.quality = v), (v) => v.toFixed(2));
  }
  return stage.dispose;
};

export default mount;
