// Plugin kit: two-rect scene, replayable view calls, scripted text edits
import { Box, Ellipse, Rect, type IUI } from 'leafer-ui';
import { button } from './controls.ts';
import { script, type Stage } from './stage.ts';

/** The docs' two rects (100 px, at 500,400 and 650,400), placed for the pane: 50 px in a card. */
export function duo(
  stage: Pick<Stage, 'preview' | 'width' | 'height'>,
  corner = false,
): { size: number; a: { x: number; y: number }; b: { x: number; y: number } } {
  const size = stage.preview ? 50 : 100;
  const gap = size * 0.5;
  // `corner` puts them at the top left, as the docs' pan-only example does, so panning has somewhere to go.
  const y = corner ? Math.round(stage.height * 0.12) : Math.round(stage.height / 2 - size / 2);
  const x = corner ? Math.round(stage.width * 0.1) : Math.round(stage.width / 2 - size - gap / 2);
  return { size, a: { x, y }, b: { x: x + size + gap, y } };
}

/** The docs' orange and yellow rects, with their corner radii. */
export function duoRects(stage: Pick<Stage, 'preview' | 'width' | 'height'>, extra: { editable?: boolean; draggable?: boolean; corner?: boolean } = {}): [Rect, Rect] {
  const { size, a, b } = duo(stage, extra.corner);
  delete extra.corner;
  const r = stage.preview ? 10 : 20;
  return [
    Rect.one({ ...extra, fill: '#FEB027', cornerRadius: [r, 0, 0, r] }, a.x, a.y, size, size),
    Rect.one({ ...extra, fill: '#FFE04B', cornerRadius: [0, r, r, 0] }, b.x, b.y, size, size),
  ];
}

/**
 * A view call that can be run again. Full view: runs once after a second (as the docs do) and
 * has Run and Reset buttons. Card: reset, run, hold, forever.
 */
export function replay(stage: Stage, layer: { x?: number; y?: number; scale?: unknown }, run: () => void, hold = 1800): void {
  const reset = (): void => {
    const l = layer as { x: number; y: number; scale: number };
    l.x = 0;
    l.y = 0;
    l.scale = 1;
  };
  if (stage.bar) {
    stage.after(1000, run);
    button(stage.bar, 'Run', run);
    button(stage.bar, 'Reset view', reset);
    return;
  }
  script(stage, async () => {
    reset();
    await stage.wait(900);
    run();
    await stage.wait(hold);
  });
}

/** Types `value` into the open text editor's editable DOM element, as keystrokes would. */
export function typeInto(editor: { innerEditor?: unknown }, value: string, html = false): void {
  const dom = (editor.innerEditor as { editDom?: HTMLDivElement } | undefined)?.editDom;
  if (!dom) return;
  if (html) dom.innerHTML = value;
  else dom.innerText = value;
  dom.dispatchEvent(new Event('input'));
}

/** Centre of an element in pane pixels. */
export function centre(el: IUI): { x: number; y: number } {
  const b = el.getBounds('box', 'world');
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}

/** The scrollbar docs' content: a wide short rect and a very tall one (500 x 100 and 650 x 2400 there). */
export function tallRects(stage: Pick<Stage, 'preview'>): [Rect, Rect] {
  const k = stage.preview ? 0.4 : 1;
  return [
    Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20 * k, 0, 0, 20 * k] }, 100 * k, 100 * k, 500 * k, 100 * k),
    Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20 * k, 20 * k, 0] }, 650 * k * 0.6, 100 * k, 650 * k, 2400 * k),
  ];
}

/** The scroller docs' three draggable rects (100 x 100, 300 x 550, 200 x 1000), scaled for the box. */
export function scrollerRects(k: number): Rect[] {
  return [
    Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20 * k, 0, 0, 20 * k] }, 0, 0, 100 * k, 100 * k),
    Rect.one({ draggable: true, fill: '#32cd79' }, 0, 110 * k, 300 * k, 550 * k),
    Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20 * k, 20 * k, 0] }, 0, 670 * k, 200 * k, 1000 * k),
  ];
}

/** Docs coordinates (rects of 100 at 100,100 / 100,300 / 400,200) mapped into the pane. */
export function linkLayout(stage: Pick<Stage, 'preview'>): { x(n: number): number; y(n: number): number; s(n: number): number } {
  const p = stage.preview;
  const kx = p ? 0.45 : 1.5;
  const ky = p ? 0.4 : 0.9;
  const ks = p ? 0.4 : 0.9;
  return { x: (n) => (p ? 14 : 70) + n * kx, y: (n) => (p ? 14 : 24) + n * ky, s: (n) => n * ks };
}

/** One of the linker docs' boxes: yellow or orange, draggable, with an id and an optional connection dot. */
export function linkBox(
  stage: Pick<Stage, 'preview'>,
  id: string,
  at: [number, number],
  opts: { orange?: boolean; dot?: 'right' | 'left'; size?: number; fixed?: boolean } = {},
): Box {
  const L = linkLayout(stage);
  const w = L.s(opts.size ?? 100);
  const r = L.s(20);
  const box = Box.one(
    { id, draggable: !opts.fixed, fill: opts.orange ? '#FEB027' : '#FFE04B', cornerRadius: opts.orange ? [0, r, r, 0] : [r, 0, 0, r] },
    L.x(at[0]),
    L.y(at[1]),
    w,
    w,
  );
  if (opts.dot) box.add(linkDot(stage, opts.dot === 'right' ? w - L.s(8) : L.s(8), opts.dot === 'right' ? w / 2 : L.s(20)));
  return box;
}

/** The docs' small violet connection dot. */
export function linkDot(stage: Pick<Stage, 'preview'>, x: number, y: number): Ellipse {
  const d = stage.preview ? 6 : 8;
  return new Ellipse({ x, y, width: d, height: d, around: 'center', fill: '#836DFF', stroke: '#000', strokeWidth: 1, hittable: false });
}

/** A card script (nothing in the full view): the ghost drags `el` up and down so the linkers attached to it follow. */
export function dragAbout(stage: Stage, engine: Parameters<Stage['ghost']>[0], el: IUI, dy: number): void {
  if (!stage.preview) return;
  const ghost = stage.ghost(engine);
  script(stage, async () => {
    const c = centre(el);
    await stage.wait(600);
    await ghost.drag(c, { x: c.x, y: c.y + dy }, 900);
    await stage.wait(700);
    const d = centre(el);
    await ghost.drag(d, c, 900);
    await stage.wait(800);
  });
}

/** Four separate 80 x 80 frame images (data: URLs), for a Robot built from a list of pictures. */
export function frameImages(): string[] {
  const colours = ['#32cd79', '#FEB027', '#836DFF', '#ff4c4c'];
  return colours.map((c, i) => {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 80;
    const g = cv.getContext('2d')!;
    g.fillStyle = c;
    g.beginPath();
    g.arc(40, 40, 10 + i * 9, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#fff';
    g.font = 'bold 22px sans-serif';
    g.textAlign = 'center';
    g.fillText(String(i + 1), 40, 48);
    return cv.toDataURL();
  });
}
