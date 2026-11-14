// Pick the two scroll offsets, see where they sit on the panel and the target, and watch the progress
import { scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const EDGES = ['start', 'center', 'end', '0.25', '0.75', '20px', '-20px', '25%', '10vh'] as const;
type Edge = (typeof EDGES)[number];
type Pair = [target: Edge, container: Edge];

const PRESETS = {
  'enter to leave': [['start', 'end'], ['end', 'start']],
  'slide in at the bottom': [['start', 'end'], ['end', 'end']],
  'slide out at the top': [['start', 'start'], ['end', 'start']],
  'centre crosses the panel': [['center', 'end'], ['center', 'start']],
} as const satisfies Record<string, readonly [Pair, Pair]>;

/** Turns an edge into pixels along an axis of `length` px, the way the docs describe: 0 to 1, names, px, % and vh. */
function edgePx(edge: string, length: number): number {
  if (edge === 'start') return 0;
  if (edge === 'center') return length / 2;
  if (edge === 'end') return length;
  const n = parseFloat(edge);
  if (edge.endsWith('px')) return n;
  if (edge.endsWith('%')) return (n / 100) * length;
  if (edge.endsWith('vh')) return (n / 100) * window.innerHeight;
  return n * length;
}

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="explorer">
      <div class="view">
        <div class="scroller">
          <div class="gap"></div>
          <div class="target">target<i class="tick a"></i><i class="tick b"></i></div>
          <div class="gap"></div>
        </div>
        <div class="line a"><span>A</span></div>
        <div class="line b"><span>B</span></div>
      </div>
      <div class="meter"><div class="fill"></div><code class="num">progress 0.00</code></div>
    </div>`;
  el.querySelector('.explorer')!.classList.toggle('full', !preview);
  const q = <T extends HTMLElement>(s: string): T => el.querySelector<T>(s)!;
  const scroller = q('.scroller');
  const target = q('.target');
  const fill = q('.fill');
  const num = q('.num');

  const a: Pair = ['start', 'end'];
  const b: Pair = ['end', 'start'];
  const controls = !preview ? panel(el) : undefined;
  let showRange: ((v: string) => void) | undefined;
  let cancel: VoidFunction | undefined;

  const draw = (): void => {
    const h = scroller.clientHeight;
    const t = target.offsetHeight;
    q('.line.a').style.top = `${edgePx(a[1], h)}px`;
    q('.line.b').style.top = `${edgePx(b[1], h)}px`;
    q('.tick.a').style.top = `${edgePx(a[0], t)}px`;
    q('.tick.b').style.top = `${edgePx(b[0], t)}px`;
  };
  const attach = (): void => {
    cancel?.();
    draw();
    // Each offset entry is "<point on the target> <point on the container>".
    cancel = scroll((progress, info) => {
      fill.style.transform = `scaleX(${progress})`;
      num.textContent = `progress ${progress.toFixed(2)}`;
      showRange?.(info.y.offset.map((px) => `${Math.round(px)}px`).join(' to '));
    }, { container: scroller, target, offset: [`${a[0]} ${a[1]}`, `${b[0]} ${b[1]}`] });
  };

  const scope = scopeMotion(el, () => {
    attach();
    if (preview) autoScroll(scroller, { duration: 6 });
  });

  if (controls) {
    const change = (): void => scope.run(attach);
    const pick = (label: string, pair: Pair, i: 0 | 1): HTMLSelectElement =>
      controls.select(label, EDGES, pair[i], (v) => {
        pair[i] = v;
        change();
      });
    const sel = [pick('A: target', a, 0), pick('A: panel', a, 1), pick('B: target', b, 0), pick('B: panel', b, 1)];
    controls.select('preset', Object.keys(PRESETS) as Array<keyof typeof PRESETS>, 'enter to leave', (name) => {
      const [pa, pb] = PRESETS[name];
      [a[0], a[1]] = pa;
      [b[0], b[1]] = pb;
      [a[0], a[1], b[0], b[1]].forEach((v, i) => (sel[i]!.value = v));
      change();
    });
    showRange = controls.readout('progress runs from scroll position', '');
    change();
    hint(el, 'Progress is 0 when the A tick on the target meets the A line on the panel, and 1 when the B ticks meet the B line. Change either end of the offset and the lines move; scroll to see it.');
  }

  return () => {
    cancel?.();
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
