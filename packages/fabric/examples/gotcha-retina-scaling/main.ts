// enableRetinaScaling: sharp on a dense screen, blurry without
import { Canvas, FabricText, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { slider } from '../../shared/controls.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';

// Stands in for a 3x screen: the real devicePixelRatio of this machine may be 1.
class Screen3x extends Canvas {
  override getRetinaScaling(): number {
    return this.enableRetinaScaling ? 3 : 1;
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['enableRetinaScaling: true', 'enableRetinaScaling: false'],
    hint: 'A high-density screen draws every CSS pixel with several device pixels. Here the canvases pretend to sit on a 3× screen and are magnified 3× to show what that looks like: with retina scaling the backing store has 3× the pixels (sharp), without it one pixel is stretched over nine (blurry). It is on by default; turning it off is a performance trade.',
  });
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const say = briefStatus(stage, stage.panes[0]!);
  const zoom = stage.preview ? 2 : 3;
  const draw = (c: Canvas): void => {
    c.add(
      new Rect({ left: 18, top: 15, width: 26, height: 20, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 1, objectCaching: false }),
      new Circle({ left: 50, top: 15, radius: 9, fill: '#ffd9d4', stroke: '#e94b3c', strokeWidth: 1, objectCaching: false }),
      new FabricText('Fabric', { left: 34, top: 36, fontSize: 9, fill: '#2b2a33', objectCaching: false }),
    );
  };
  const make = (retina: boolean, pane: (typeof stage.panes)[0]): Canvas => {
    const c = stage.own(new Screen3x(pane.el, { selection: false, skipTargetFind: true, enableRetinaScaling: retina }), pane);
    // magnify the whole canvas box: the backing store stays what the canvas made it
    c.wrapperEl.style.transformOrigin = '0 0';
    c.wrapperEl.style.transform = `scale(${zoom})`;
    draw(c);
    c.requestRenderAll();
    return c;
  };
  const sharp = make(true, stage.panes[0]!);
  const blurry = make(false, stage.panes[1]!);
  say(`backing ${sharp.lowerCanvasEl.width}px for ${sharp.width} CSS px`);
  void blurry;

  if (stage.bar) slider(stage.bar, 'magnify', 1, 6, 1, zoom, (v) => {
    for (const c of [sharp, blurry]) c.wrapperEl.style.transform = `scale(${v})`;
  }, (v) => `${v}×`);
  return stage.dispose;
};

export default mount;
