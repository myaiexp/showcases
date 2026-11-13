// Control panel for the merge demo: mode and size selects, build and draw-call readouts
import { h } from '@/ui/dom.ts';

const SIZES: [string, number][] = [
  ['Coarse', 3],
  ['Medium', 1.5],
  ['Fine', 0.8],
];

export function buildPanel() {
  const mode = h('select', {}, h('option', { value: 'merged' }, 'One merged geometry'), h('option', { value: 'individual' }, 'One mesh per box'));
  const size = h('select', {}, ...SIZES.map(([label, step], i) => h('option', { value: String(step), ...(i === 1 ? { selected: '' } : {}) }, label)));
  const out = {
    boxes: h('b', {}, '0'),
    build: h('b', {}, '0 ms'),
    calls: h('b', {}, '0'),
    tris: h('b', {}, '0'),
    fps: h('b', {}, '0'),
  };
  const stat = (label: string, value: HTMLElement) => h('span', { class: 'stat' }, `${label} `, value);
  const root = h(
    'div',
    { class: 'panel' },
    h('label', {}, 'Mode ', mode),
    h('label', {}, 'Boxes ', size),
    stat('boxes', out.boxes),
    stat('build', out.build),
    stat('draw calls', out.calls),
    stat('triangles', out.tris),
    stat('fps', out.fps),
  );
  const state = () => ({ merged: mode.value === 'merged', step: Number(size.value) });
  let handler: (merged: boolean, step: number) => void = () => {};
  const fire = (): void => {
    const s = state();
    handler(s.merged, s.step);
  };
  mode.addEventListener('change', fire);
  size.addEventListener('change', fire);
  return {
    root,
    state,
    onChange(fn: (merged: boolean, step: number) => void) {
      handler = fn;
    },
    setBuild(boxes: number, ms: number) {
      out.boxes.textContent = String(boxes);
      out.build.textContent = `${Math.round(ms)} ms`;
    },
    setStats(calls: number, tris: number, fps: number) {
      out.calls.textContent = String(calls);
      out.tris.textContent = tris.toLocaleString();
      out.fps.textContent = String(Math.round(fps));
    },
    dispose() {
      mode.removeEventListener('change', fire);
      size.removeEventListener('change', fire);
    },
  };
}
