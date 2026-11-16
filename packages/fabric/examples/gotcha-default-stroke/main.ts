// The default strokeWidth of 1 without a stroke colour still counts
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['default: strokeWidth 1', 'strokeWidth: 0'],
    scene: [34, 34],
    hint: 'Both rects are 20×20 with no stroke colour, shown magnified with their selection border. In v7 stroke is null (nothing is painted), but strokeWidth is still 1, and the bounding box, border and controls are measured with it: 21×21. Set strokeWidth to 0 for an exact fit.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const a = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const b = stage.own(new Canvas(pb.el, { selection: false, skipTargetFind: true }), pb);

  const make = (strokeWidth?: number): Rect =>
    new Rect({ left: 17, top: 17, width: 20, height: 20, fill: '#3b7dd8', hasControls: false, borderColor: '#e94b3c', ...(strokeWidth === undefined ? {} : { strokeWidth }) });
  const withDefault = make();
  const none = make(0);
  a.add(withDefault);
  b.add(none);
  a.setActiveObject(withDefault);
  b.setActiveObject(none);
  a.requestRenderAll();
  b.requestRenderAll();

  // numbers for the two rects, laid over the panes
  const lines = (r: Rect): string =>
    `stroke ${JSON.stringify(r.stroke)}\nstrokeWidth ${r.strokeWidth}\nwidth ${r.width}\ngetScaledWidth() ${r.getScaledWidth()}\nboundingRect ${Math.round(r.getBoundingRect().width * 100) / 100}`;
  const showA = codePanelBelow(pa, lines(withDefault), stage.preview);
  codePanelBelow(pb, lines(none), stage.preview);

  if (stage.bar) {
    slider(stage.bar, 'strokeWidth (left rect)', 0, 4, 1, 1, (v) => {
      withDefault.set('strokeWidth', v);
      withDefault.setCoords();
      showA(lines(withDefault));
      a.requestRenderAll();
    });
  }
  return stage.dispose;
};

/** A small text box laid over the lower part of a pane. */
function codePanelBelow(pane: { frame: HTMLElement }, text: string, preview: boolean): (t: string) => void {
  const box = document.createElement('pre');
  box.style.cssText = `position:absolute;left:4px;bottom:4px;margin:0;padding:3px 5px;border-radius:4px;background:rgba(255,255,255,0.88);
    font:${preview ? 8 : 12}px/1.3 ui-monospace,monospace;color:#2b2a33;pointer-events:none;z-index:4`;
  box.textContent = text;
  pane.frame.append(box);
  return (t) => {
    box.textContent = t;
  };
}

export default mount;
