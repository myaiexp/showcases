// Draggable liveSnap: snap to points inside a radius, to a grid by function, or to a polar grid with a points function
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Draggable);

const BOX = 30;
type Mode = 'points' | 'grid' | 'polar';
const POINTS = [
  { x: 40, y: 40 }, { x: 150, y: 30 }, { x: 260, y: 70 }, { x: 350, y: 30 },
  { x: 90, y: 150 }, { x: 200, y: 170 }, { x: 320, y: 160 },
];

const mount: Mount = (el, { preview }) => {
  const W = preview ? 250 : 400;
  const H = preview ? 170 : 220;
  const pts: gsap.Point2D[] = preview ? POINTS.slice(0, 5).map((p) => ({ x: p.x * 0.6, y: p.y * 0.75 })) : POINTS;
  const arena = h('div', 'arena m-points', '', el);
  arena.style.width = `${W}px`;
  arena.style.height = `${H}px`;
  const RADIUS = preview ? 22 : 36;
  // the markers for the points mode: a dot at each snap point and a ring showing the radius
  for (const p of pts) {
    const ring = h('div', 'ring', '', arena);
    ring.style.cssText = `left:${p.x + BOX / 2 - RADIUS}px;top:${p.y + BOX / 2 - RADIUS}px;width:${RADIUS * 2}px;height:${RADIUS * 2}px`;
    const dot = h('div', 'dot', '', ring);
    dot.style.cssText = `left:${RADIUS - 3}px;top:${RADIUS - 3}px`;
  }
  const box = h('div', 'box', '', arena);
  let readout: HTMLElement | undefined;

  // Each mode is one liveSnap value. Same property, three forms from the docs.
  const liveSnapFor = (mode: Mode): Draggable.Vars['liveSnap'] => {
    if (mode === 'points') return { points: pts, radius: RADIUS };
    if (mode === 'grid') return (v: number) => Math.round(v / 40) * 40;
    return {
      points: (p: gsap.Point2D): gsap.Point2D => {
        const cx = W / 2 - BOX / 2;
        const cy = H / 2 - BOX / 2;
        const r = Math.round(Math.hypot(p.x - cx, p.y - cy) / 40) * 40;
        const a = Math.round(Math.atan2(p.y - cy, p.x - cx) / (Math.PI / 6)) * (Math.PI / 6);
        return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
      },
    };
  };

  let drag: Draggable | undefined;
  const make = (mode: Mode): void => {
    drag?.kill();
    arena.className = `arena m-${mode}`;
    drag = Draggable.create(box, {
      type: 'x,y',
      bounds: arena,
      liveSnap: liveSnapFor(mode),
      onDrag() {
        if (readout) readout.textContent = `x ${Math.round(this.x)}, y ${Math.round(this.y)}`;
      },
    })[0];
  };

  const ctx = gsap.context(() => {
    if (preview) {
      // hop from snap point to snap point, as a snapped drag would look
      const tl = gsap.timeline({ repeat: -1 });
      for (const p of [...pts, pts[0]!]) tl.to(box, { x: p.x, y: p.y, duration: 0.55, ease: 'back.out(2)' }).to({}, { duration: 0.35 });
    }
  }, el);

  if (!preview) {
    gsap.set(box, { x: POINTS[0]!.x, y: POINTS[0]!.y });
    const bar = h('div', 'controls', '', el);
    const names: Record<Mode, string> = { points: 'points + radius', grid: 'function (40px grid)', polar: 'points function (polar)' };
    for (const mode of ['points', 'grid', 'polar'] as Mode[]) {
      const label = h('label', 'chk', '', bar);
      const radio = h('input', '', '', label);
      radio.type = 'radio';
      radio.name = 'livesnap-mode';
      radio.checked = mode === 'points';
      radio.addEventListener('change', () => make(mode));
      label.append(names[mode]);
    }
    readout = h('p', 'readout', 'Drag the box: it snaps while moving.', el);
    make('points');
  }

  return () => {
    drag?.kill();
    ctx.revert();
  };
};

export default mount;
